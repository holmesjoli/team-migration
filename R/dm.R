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


# df <- readxl::read_excel(pth, sheet = 2, skip = 10) %>%
#   filter(Year == 2020) %>%
#   select(-c(Year, Index))
# 
#sex <- c("Total", "Male", "Female")
# 
# age_groups <- c("0-4", "5-9", "10-14", "15-19", "20-24", "25-29", "30-34", 
#                 "35-39", "40-44", "45-49", "50-54", "55-59", "60-64", "65-69",
#                 "70-74", "75+", "Sum")
# 
# n <- lapply(sex, function(x) {paste(x, age_groups, sep = "_")}) %>% unlist()
# names(df)[5:ncol(df)] <- n
# 
# df <- df %>%
#   pivot_longer(names_to = "variable", values_to = "value", cols = n) %>% 
#   tidyr::separate(variable,
#                   into = c("sex", "age_group"),
#                   sep = "([(_)])")
# 
# 
# df2 <- readxl::read_excel(pth, sheet = 3, skip = 0)
  
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
    pivot_longer(names_to = "variable", values_to = "value", cols = n) %>%
    tidyr::separate(variable,
                    into = c("year", "sex"),
                    sep = "([(_)])")

  return(df)
}

#' @title Location lookup
#' @description Creates a lookup table between all the regions, development groups,
#' country or area of origin and their lookup codes
#' @return data.frame
lu.loc <- function(pth = "./data/undesa_pd_2020_ims_stock_by_sex_destination_and_origin.xlsx") {

  readxl::read_excel(pth, sheet = 2, skip = 10, na = "..") %>%
    distinct(`Region, development group, country or area of origin`,
             `Location code of origin`) %>%
    rename(region = `Region, development group, country or area of origin`,
           loc_code = `Location code of origin`)
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
    filter(!(X2 %in% LETTERS)) %>%
    filter(X2 != "") %>%
    rename(name = X2, iso2 = X3, iso3 = X4, un_code = X5)
}

dm.geojson <- function(pth = "./data/shape/World_Countries__Generalized_.shp") {
  
  df <- sf::read_sf(pth) %>%
    select(ISO, geometry) %>%
    rename(iso2 = ISO) %>% 
    inner_join(xwalk.iso())
}
