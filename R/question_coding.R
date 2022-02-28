dm.A01a_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A01a") %>% 
    inner_join(df_acq) %>%
    select(iso3, mode_id, specification, values) %>% 
    mutate(definition = NA,
           restriction_warning = case_when(values == 2 ~ "dual",
                                           values == 3 ~ "wedlock",
                                           values == 4 ~ "father-citizen",
                                           values == 5 ~ "parent-group",
                                           values == 6 ~ "general"),
           wing = "parentage") %>%
    select(-values)
}

dm.A01b_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A01b") %>% 
    inner_join(df_acq) %>%
    select(iso3, mode_id, specification, values) %>% 
    mutate(definition = NA,
           restriction_warning = case_when(values == 2 ~ "dual",
                                           values == 3 ~ "wedlock",
                                           values == 4 ~ "father-citizen",
                                           values == 5 ~ "parent-group"),
           wing = "parentage") %>%
    select(-values)
}

dm.A02a_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A02a") %>% 
    inner_join(df_acq) %>%
    select(iso3, mode_id, specification, values) %>% 
    mutate(definition = NA,
           restriction_warning = case_when(values == 2 ~ "parent-residence",
                                           values == 3 ~ "group"),
           wing = "parentage") %>%
    select(-values)
}

dm.A02b_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A02b") %>% 
    inner_join(df_acq) %>%
    select(iso3, mode_id, specification, values) %>% 
    mutate(definition = NA,
           restriction_warning = case_when(values == 2 ~ "father-citizen",
                                           values == 3 ~ "parent-residence",
                                           values == 4 ~ "group"),
           wing = "parentage") %>%
    select(-values)
}

dm.A03b_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A03b") %>% 
    inner_join(df_acq) %>%
    select(iso3, mode_id, specification, values) %>% 
    mutate(definition = "stateless",
           restriction_warning = case_when(values == 2 ~ "father-birth",
                                           values == 3 ~ "parent-residence",
                                           values == 4 ~ "parent-group"),
           wing = "other") %>%
    select(-values)
}

dm.A06_questions <- function(df_long, df_acq) {

  df_long %>%
    filter(mode_id == "A06") %>% 
    inner_join(df_acq) %>%
    select(iso3, mode_id, specification, values) %>% 
    mutate(definition = NA,
           restriction_warning = NA,
           wing = "residence") %>%
    select(-values)
}

dm.A06a_questions <- function(df_long, df_acq) {

  df_long %>%
    filter(mode_id == "A06a" & cat) %>% 
    inner_join(df_acq) %>%
    select(iso3, mode_id, specification, values) %>% 
    mutate(definition = NA,
           restriction_warning = NA,
           wing = "residence") %>%
    select(-values)
}

dm.A06b_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A06b") %>% 
    inner_join(df_acq) %>%
    select(iso3, mode_id, specification, values) %>% 
    mutate(definition = NA,
           restriction_warning = case_when(values == 2 ~ "major-exceptions",
                                           values == 3 ~ "no-major-exceptions",
                                           values == 99 ~ "no-provision"),
           wing = "residence") %>%
    select(-values)
}

dm.A07_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A07") %>% 
    inner_join(df_acq) %>%
    select(iso3, mode_id, specification, values) %>% 
    mutate(definition = "childhood",
           restriction_warning = case_when(values == 2 ~ "residence-period",
                                           values == 3 ~ "schooling-period"),
           wing = "residence") %>%
    select(-values)
}

dm.A08_questions <- function(df_long, df_acq) {

  df_long %>%
    filter(mode_id == "A08") %>%
    inner_join(df_acq) %>%
    select(iso3, mode_id, specification, values) %>%
    mutate(definition = NA,
           restriction_warning = case_when(values == 2 ~ "residence"
                                           values == 3 ~ "spouse-female",
                                           values == 4 ~ "spouse-female-residence",
                                           values == 5 ~ "spouse-male",
                                           values == 6 ~ "gender",
                                           values == 7 ~ "spouse-group"),
           wing = "family") %>%
    select(-values)
}


dm.A09_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A09") %>% 
    inner_join(df_acq) %>%
    select(iso3, mode_id, specification, values) %>% 
    mutate(definition = NA,
           restriction_warning = case_when(values == 2 ~ "age"),
           wing = "parentage") %>%
    select(-values)
}

dm.A10_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A10") %>% 
    inner_join(df_acq) %>%
    select(iso3, mode_id, specification, values) %>% 
    mutate(definition = "adoption",
           restriction_warning = case_when(values == 2 ~ "age"),
           wing = "parentage") %>%
    select(-values)
}

dm.A11_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A11") %>%
    inner_join(df_acq) %>%
    select(iso3, mode_id, specification, values) %>%
    mutate(definition = "relatives",
           restriction_warning = NA,
           wing = "family") %>%
    select(-values)
}

dm.A12a_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A12a") %>%
    inner_join(df_acq) %>%
    select(iso3, mode_id, specification, values) %>%
    mutate(definition = "relatives",
           restriction_warning = NA,
           wing = "family") %>%
    select(-values)
}

dm.A12b_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A12b") %>%
    inner_join(df_acq) %>%
    select(iso3, mode_id, specification, values) %>%
    mutate(definition = "relatives",
           restriction_warning = case_when(values == 2 ~ "generational",
                                           values == 3 ~ "spousal"),
           wing = "family") %>%
    select(-values)
}

dm.A13_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A13") %>%
    inner_join(df_acq) %>%
    select(iso3, mode_id, specification, values) %>%
    mutate(definition = NA,
           restriction_warning = case_when(values == 2 ~ "residence"
                                           values == 3 ~ "spouse-female",
                                           values == 4 ~ "spouse-female-residence"),
           wing = "family") %>%
    select(-values)
}

dm.A14_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A14") %>% 
    inner_join(df_acq) %>%
    select(iso3, mode_id, specification, values) %>% 
    mutate(definition = NA,
           restriction_warning = case_when(values == 2 ~ "age"),
           wing = "parentage") %>%
    select(-values)
}


dm.A16_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A16") %>% 
    inner_join(df_acq) %>%
    select(iso3, mode_id, specification, values) %>%
    mutate(definition = NA,
           restriction_warning = ifelse(values == 2, "Mode", NA),
           wing = "other") %>%
    select(-values)
}

dm.A18_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A18") %>% 
    inner_join(df_acq) %>%
    select(iso3, mode_id, specification, values) %>%
    mutate(definition = NA,
           restriction_warning = ifelse(values == 2, "residence", NA),
           wing = "other") %>%
    select(-c(values))
}

dm.A19_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A19") %>% 
    inner_join(df_acq) %>%
    select(iso3, mode_id, specification, values) %>%
    mutate(definition = NA,
           restriction_warning = NA,
           wing = "other") %>%
    select(-c(values))
}

dm.A21_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A21") %>% 
    inner_join(df_acq) %>%
    select(iso3, mode_id, specification, values) %>% 
    mutate(definition = "long-time",
           restriction_warning = NA,
           wing = "residence") %>%
    select(-values)
}

dm.A22_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A22") %>% 
    inner_join(df_acq) %>%
    select(iso3, mode_id, specification, values) %>%
    mutate(definition = "refugee",
           restriction_warning = NA,
           wing = "other") %>%
    select(-values)
}

dm.A23_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A23") %>% 
    inner_join(df_acq) %>%
    select(iso3, mode_id, specification, values) %>t%
    mutate(definition = "stateless",
           restriction_warning = ifelse(values == 2, "general", NA),
           wing = "other") %>%
    select(-values)
}

dm.A24_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A24") %>% 
    inner_join(df_acq) %>%
    select(iso3, mode_id, specification, values) %>%
    mutate(definition = "achievements",
           restriction_warning = NA,
           wing = "other") %>%
    select(-values)
}

dm.A25_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A25") %>% 
    inner_join(df_acq) %>%
    select(iso3, mode_id, specification, values) %>%
    mutate(definition = NA,
           restriction_warning = case_when(values == 2 ~ "public-service",
                                           values == 3 ~ "military"),
           wing = "other") %>%
    select(-values)
}

dm.A26_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A26") %>% 
    inner_join(df_acq) %>%
    select(iso3, mode_id, specification, values) %>%
    mutate(definition = NA,
           restriction_warning = "general",
           wing = "other") %>%
    select(-values)
}

dm.combine_questions <- function(df_long, df_acq) {
  
  df <- data.frame(mode_id = c("A01a", "A01a", "A01b", "A02a", "A02b", "A02b",
                               "A09", "A09", "A10", "A10", "A14", "A14", "A14", 
                               "A16", "A1t8", "A22", "A23", "A24", "A25", "A26", 
                               "A08", "A08", "A13", "A13", "A13", "A12a", "A12b",
                               "A12b", "A07", "A21"),
                   wing = c(rep("parentage", 13), rep("other", 7), 
                            rep("family", 8), rep("residence", 2)),
                   question = c("Q2", "Q3", "Q3", "Q2", "Q1", "Q1", "Q1", 
                                "Q3", "Q5", "Q3", "Q3", "Q4", "Q6", "Q7", "Q8", 
                                "Q9", "Q10", "Q11", "Q12", "Q13", "Q14", "Q15", 
                                "Q14", "Q15", "Q16", "Q17", "Q17", "Q18", "Q19",
                                "Q20", "Q21"))
  
  A01a <- dm.A01a_questions(df_long, df_acq)
  A01b <- dm.A01b_questions(df_long, df_acq)
  A02a <- dm.A02a_questions(df_long, df_acq)
  A02b <- dm.A02b_questions(df_long, df_acq)
  A03b <- dm.A03b_questions(df_long, df_acq)
  A06 <- dm.A06_questions(df_long, df_acq)
  # A06a <- dm.A06a_questions(df_long, df_acq)
  # A06b <- dm.A06b_questions(df_long, df_acq)
  # A06c <- dm.A06c_questions(df_long, df_acq)
  # A06d <- dm.A06d_questions(df_long, df_acq)
  # A06e <- dm.A06e_questions(df_long, df_acq)
  # A06f <- dm.A06f_questions(df_long, df_acq)
  A07 <- dm.A07_questions(df_long, df_acq)
  A08 <- dm.A08_questions(df_long, df_acq)
  A09 <- dm.A09_questions(df_long, df_acq)
  A10 <- dm.A10_questions(df_long, df_acq)
  A11 <- dm.A11_questions(df_long, df_acq)
  A12a <- dm.A12a_questions(df_long, df_acq)
  A12b <- dm.A12b_questions(df_long, df_acq)
  A13 <- dm.A13_questions(df_long, df_acq)
  A14 <- dm.A14_questions(df_long, df_acq)
  A16 <- dm.A16_questions(df_long, df_acq)
  A18 <- dm.A18_questions(df_long, df_acq)
  A19 <- dm.A19_questions(df_long, df_acq)
  A21 <- dm.A21_questions(df_long, df_acq)
  A22 <- dm.A22_questions(df_long, df_acq)
  A23 <- dm.A23_questions(df_long, df_acq)
  A24 <- dm.A24_questions(df_long, df_acq)
  A25 <- dm.A25_questions(df_long, df_acq)
  A26 <- dm.A26_questions(df_long, df_acq)
  
  A01a %>%
    bind_rows(A01b) %>%
    bind_rows(A02a) %>%
    bind_rows(A02b) %>%
    bind_rows(A03b) %>%
    bind_rows(A09) %>%
    bind_rows(A10) %>%
    bind_rows(A14) %>%
    bind_rows(A16) %>%
    bind_rows(A18) %>%
    bind_rows(A22) %>%
    bind_rows(A23) %>%
    bind_rows(A24) %>%
    bind_rows(A25) %>%
    bind_rows(A26)
}

