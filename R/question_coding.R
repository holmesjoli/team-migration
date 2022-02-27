dm.A16_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A16") %>% 
    inner_join(df_acq) %>%
    select(iso3, specification, category, values) %>% 
    mutate(question = "Were you previously a citizen of {cntry}?",
           definition = NA,
           restriction_warning = ifelse(values == 2, "Mode", NA)) %>%
    select(-values)
}

dm.A16_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A16") %>% 
    inner_join(df_acq) %>%
    select(iso3, specification, category, values) %>% 
    mutate(question = "Were you previously a citizen of {cntry}?",
           definition = NA,
           restriction_warning = ifelse(values == 2, "Mode", NA)) %>%
    select(-values)
}

dm.A18_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A18") %>% 
    inner_join(df_acq) %>%
    select(iso3, specification, values) %>% 
    mutate(question = "Click to see if you apply",
           definition = NA,
           restriction_warning = ifelse(values == 2, "residence", NA)) %>%
    select(-c(values))
}

dm.A19_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A19") %>% 
    inner_join(df_acq) %>%
    select(iso3, specification, values) %>% 
    mutate(question = "Do you have a cultural affinity for {cntry}? Click to see if you apply",
           definition = NA,
           restriction_warning = NA) %>%
    select(-c(values))
}

dm.A22_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A22") %>% 
    inner_join(df_acq) %>%
    select(iso3, specification, category, values) %>% 
    mutate(question = "Are you a refugee?",
           definition = "refugee",
           restriction_warning = NA) %>%
    select(-values)
}

dm.A23_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A23") %>% 
    inner_join(df_acq) %>%
    select(iso3, specification, category, values) %>% 
    mutate(question = "Are you stateless?",
           definition = "stateless",
           restriction_warning = ifelse(values == 2, "general", NA)) %>%
    select(-values)
}

dm.A24_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A24") %>% 
    inner_join(df_acq) %>%
    select(iso3, specification, category, values) %>% 
    mutate(question = "Do you have any special special achievements, contributions or services to {cntry}?",
           definition = "achievements",
           restriction_warning = NA) %>%
    select(-values)
}

dm.A25_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A25") %>% 
    inner_join(df_acq) %>%
    select(iso3, specification, category, values) %>% 
    mutate(question = "Have you worked in public service for {cntry}?",
           definition = NA,
           restriction_warning = case_when(values == 2 ~ "public-service",
                                           values == 3 ~ "military")) %>%
    select(-values)
}

dm.A26_questions <- function(df_long, df_acq) {
  
  df_long %>%
    filter(mode_id == "A26") %>% 
    inner_join(df_acq) %>%
    select(iso3, specification, category, values) %>% 
    mutate(question = "Have you made specific payments or investments in a country {cntry}?",
           definition = NA,
           restriction_warning = "general") %>%
    select(-values)
}

dm.combine_questions <- function(df_long, df_acq) {
  
  A16 <- dm.A16_questions(df_long, df_acq)
  A18 <- dm.A18_questions(df_long, df_acq)
  A19 <- dm.A19_questions(df_long, df_acq)
  A22 <- dm.A22_questions(df_long, df_acq)
  A23 <- dm.A23_questions(df_long, df_acq)
  A24 <- dm.A25_questions(df_long, df_acq)
  A25 <- dm.A25_questions(df_long, df_acq)
  A26 <- dm.A26_questions(df_long, df_acq)
  
  A23 %>%
    bind_rows(A16) %>%
    bind_rows(A18) %>%
    bind_rows(A22) %>%
    bind_rows(A24) %>%
    bind_rows(A25) %>%
    bind_rows(A26)
  
}

