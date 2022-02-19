#' @title Data management for procedure variable
dm_procedure <- function(df, n = 10) {

  artcl <- df %>%
    select(cntry_mode_id, mode_id, iso3) %>%
    bind_cols(
      stringr::str_split_fixed(df$article, ";", n=n) %>% 
        as.data.frame()) %>% 
    tidyr::pivot_longer(names_to = "id", values_to="article", -c(cntry_mode_id, mode_id, iso3))
  
  proc <- df %>%
    select(cntry_mode_id, mode_id, iso3) %>%
    bind_cols(
      stringr::str_split_fixed(df$procedure, ";", n=n) %>% 
        as.data.frame()) %>%
    tidyr::pivot_longer(names_to = "id", values_to="procedure", -c(cntry_mode_id, mode_id, iso3)) 
  
  spec <- df %>%
    select(cntry_mode_id, mode_id, iso3) %>%
    bind_cols(
      stringr::str_split_fixed(df$specification, ";", n=n) %>% 
        as.data.frame()) %>%
    tidyr::pivot_longer(names_to = "id", values_to="specification", -c(cntry_mode_id, mode_id, iso3))

  artcl %>%
    inner_join(proc) %>%
    inner_join(spec) %>%
    mutate(procedure = gsub("[\r\n]", "", procedure),
           procedure = gsub("\\.", "", procedure),
           procedure = stringr::str_trim(procedure, "both"),
           article = stringr::str_trim(article, "both"),
           specification = stringr::str_trim(specification, "both")) %>% 
    filter(article != "" & procedure != "")
}
  
#' @title Data management for destination origin data
dm.dest_org <- function(pth = "./data/undesa_pd_2020_ims_stock_by_sex_destination_and_origin.xlsx") {

  sex <- c("Both", "Male", "Female")
  yr <- seq(1990, 2020, 5)
  n <- paste(yr, sort(rep(sex, 7), T), sep ="_")
  
  df <- readxl::read_excel(pth, sheet = 2, skip = 10, na = "..") %>% 
    select(-c(Index, `Region, development group, country or area of destination`, 
              `Region, development group, country or area of origin`)) %>% 
    rename(dest_notes = `Notes of destination`,
           dest_dtype = `Type of data of destination`,
           dest_loc = `Location code of destination`,
           orig_loc = `Location code of origin`)

  st <- (ncol(df) - length(n)) + 1
  end <- ncol(df)

  names(df)[st:end] <- n

  df %>%
    pivot_longer(names_to = "variable", values_to = "value", cols = all_of(n)) %>%
    separate(variable,
             into = c("year", "sex"),
             sep = "([(_)])") %>% 
    filter(year == 2000 & sex == "Both") %>% 
    select(-c(year, sex)) %>% 
    readr::write_csv("./data/flow.csv")
}

#' @title Location lookup
#' @description Creates a lookup table between all the regions, development groups,
#' country or area of origin and their lookup codes
#' @return data.frame
lu.loc <- function(pth) {

  readxl::read_excel(pth, sheet = 2, skip = 10, na = "..") %>%
    distinct(`Region, development group, country or area of origin`,
             `Location code of origin`) %>%
    rename(region = `Region, development group, country or area of origin`,
           loc_code = `Location code of origin`) %>% 
    readr::write_csv("./data/lu_code.csv")
}

#' @title ISO Crosswalk
#' @description Extracts a table of ISO values from the web
#' @return data.frame
xwalk.iso <- function(url = "https://www.nationsonline.org/oneworld/country_code_list.htm") {
  
  url %>%
    xml2::read_html(url) %>%
    rvest::html_elements("table") %>% 
    rvest::html_table() %>%
    bind_rows() %>%
    select(-X1) %>%
    filter(!(X2 %in% LETTERS)) %>%i
    filter(X2 != "") %>%
    rename(name = X2, iso2 = X3, iso3 = X4, un_code = X5)
}

#' @title World shape file
#' @return data.frame
dm.geojson <- function(pth = "./data/shape/world-administrative-boundaries.shp") {
  
  sf::read_sf(pth) %>%
    select(iso3, geometry)
}

dm.region_geojson <- function(xwalk) {
  
  df <- dm.geojson() %>%
    full_join(xwalk) %>%
    group_by(subregion_code, subregion) %>%
    summarise(geometry = sf::st_union(geometry)) %>%
    ungroup() %>%
    rmapshaper::ms_simplify(keep=.05) %>%
    sf::st_as_sf()

}

