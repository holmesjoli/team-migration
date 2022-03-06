<script>

  import { select } from "d3";
  import {uniqueArray} from "./helper.js"

  export let selectedCountry;
  export let definitions;
  export let warnings;
  export let questions;
  export let acqMode;
  export let butterflies;

  $: {
    if (selectedCountry !== "") {
      acqMode = acqMode.filter(function(d) {
        return d.country === selectedCountry;
      });

      let showDef = uniqueArray(acqMode, "definition")[0];
      let showWarn = uniqueArray(acqMode, "restriction_warning")[0];

      if (showDef !== "NA") {
        definitions = definitions.filter(function(d) {
          d.definition_id === showDef;
        });

        // let def = definitions.definition[0];
      }

      if (showWarn !== "NA") {
        warnings = warnings.filter(function(d) {
          d.restriction_warning === showWarn;
        });
        console.log(questions);
        console.log(butterflies[2])
        // let warn = warnings.message[0];
      }
    }
  }
</script>

{#if selectedCountry !== ""}
  <section class="big-butterfly__container">
    <h1>
      Paths to citizenship in {selectedCountry}
    </h1>
    <div id="citizenship-paths">
        {@html butterflies[2]}
    </div>
    <div id="documentation">
      <div id="warnings"></div>
      <div id="specification"></div>
      <div id="definitions"></div>
  </div>
  </section>
{/if}

<style>
  #container-paths {
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #documentation {
    display: flex;
    flex-direction: row;
  }

  #documentation div {
    background: rgb(211, 211, 211);
    max-height: 75px;
  }
</style>