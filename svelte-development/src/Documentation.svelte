<script>
  import {getQuestionWithCountryName} from "./helper"

  export let selectedCountry;
  export let trueMode;
  export let acqMode;
  export let warnings;
  export let definitions;

  let specificationWarningMessage, definitionMessage;

  // If a particular mode for a particular country returns TRUE
  // Check to see if warning is NA in warnings.csv
  // Use warnings.csv to look up the warning and print the warning to the user
  // If warning is not NA, print the specification from modes_acq.csv b. If a particular mode for a particular country returns TRUE
  // Check to see if definitions is NA in definitions.csv
  // Use definitions.csv to look up the definition and print the definition to the user

  $: {
    let countryAcqMode = acqMode.filter(d => d.country == selectedCountry);
    let dataForThisMode = countryAcqMode.filter(d => d.mode_id == trueMode)[0];

    let warningType = dataForThisMode.restriction_warning;
    specificationWarningMessage = warningType == "NA"
      ? dataForThisMode.specification
      : warnings.filter(d => d.restriction_warning == warningType)[0].message;
    specificationWarningMessage = getQuestionWithCountryName(selectedCountry, specificationWarningMessage);

    let definitionType = dataForThisMode.definition;
    definitionMessage = definitionType == "NA"
      ? ""
      : definitions.filter(d => d.definition_id == definitionType)[0].definition;
  }
</script>


<div id="documentation">
  <div>
    <h3>Specifications / Warnings</h3>
    {specificationWarningMessage}
  </div>
  <div>
    <h3>Definitions</h3>
    {definitionMessage}
  </div>
</div>

<style>
  #documentation {
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;
  }
  #documentation > div {
    text-align: left;
    font-size: 0.8rem;
    background: #F5F5F5;
    width: 50%;
    border-radius: 8px;
    padding: 1rem 1.5rem;
  }
  h3 {
    margin-top: 0.5em;
  }
</style>