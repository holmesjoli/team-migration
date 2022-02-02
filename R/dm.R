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


df <- readxl::read_excel(pth, sheet = 2, skip = 10) %>%
  filter(Year == 2020) %>%
  select(-c(Year, Index))

sex <- c("Total", "Male", "Female")

age_groups <- c("0-4", "5-9", "10-14", "15-19", "20-24", "25-29", "30-34", 
                "35-39", "40-44", "45-49", "50-54", "55-59", "60-64", "65-69",
                "70-74", "75+", "Total")

n <- lapply(sex, function(x) {paste(x, age_groups, sep = "_")}) %>% unlist()
names(df)[6:56] <- n

df <- df %>%
  pivot_longer(names_to = "variable", values_to = "value", cols = n) %>% 
  tidyr::separate(variable,
                  into = c("sex", "age_group"),
                  sep = "([(_)])")
  


