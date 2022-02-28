# Question Logic

1. Filter modes_acq.csv to only accepted acquisition methods

2. Filter citizenship long to specific user inputs
* A01a
  - Path is TRUE if Q3 == "yes" & Q2 == "yes"
* A01b
  - Path is TRUE if Q3 == "yes" & Q2 == "no"
* A02a
  - Path is TRUE if Q2 == "yes"
* A02b
  - Path is TRUE if Q1 == "yes" & Q2 == "yes"
* A06a
  - Path is TRUE if Q22 == "yes" & Q23 is great than the value A06a_yrs
* A06b
  - Path is TRUE if Q22 == "yes" & Q24 == "yes"
* A06c
  - Path is TRUE if Q22 == "yes" & Q25 == "yes"
  - Warning if dualcit_comb == 0; this country does not accept dual citizens
* A06d
  - Path is TRUE if Q22 == "yes" & Q26 == "yes"
* A06e
  - Path is TRUE if Q22 == "yes" & Q27 == "no"
* A06f
  - Path is TRUE if Q22 == "yes" & Q28 == "yes"
* A07
  - Path is TRUE if Q20 == "yes"
* A08
  - Path is TRUE if Q14 == "yes" & Q15 == "yes"
* A09
  - Path is TRUE if Q3 == "yes" & Q4 == "yes" & Q6 == "yes"
* A10
  - Path is TRYE if Q3 == "yes" & Q5 == "yes"
* A11
  - Path is TRUE if Q17 == "yes" & Q18 == "no"
* A12a
  - Path is TRUE if Q17 == "yes" & Q18 == "yes" & Q19 == "yes"
* A12b
  - Path is TRUE if Q17 == "yes" & Q18 == "yes" & Q19 == "no"
* A13
  - Path is TRUE if Q14 == "yes" & Q15 == "yes" & Q16 == "yes"
* A14
  - Path is TRUE if Q3 == "yes" & Q4 == "yes" & Q6 == "yes"
* A16
  - Path is TRUE if Q7 == "yes"
* A18
  - Path is TRUE if Q18 == "yes"
* A19
  - Path is TRUE if Q29 == "yes"
* A21
  - Path is TRUE if Q21 == "yes"
* A22
  - Path is TRUE if Q9 == "yes"
* A23
  - Path is TRUE if Q10 == "yes"
* A24
  - Path is TRUE if Q11 == "yes"
* A25
  - Path is TRUE if Q12 == "yes"
* A26
  - Path is TRUE if Q13 == "yes"

3. If a particular mode for a particular country returns TRUE
  a. 
    - Check to see if warning is NA in warnings.csv
    - Use warnings.csv to look up the warning and print the warning to the user
    - If warning is not NA, print the specification from modes_acq.csv
  b. If a particular mode for a particular country returns TRUE
    - Check to see if definitions is NA in definitions.csv
    - Use definitions.csv to look up the definition and print the definition to the user
