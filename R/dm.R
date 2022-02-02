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
