<script>

  // import { select } from "d3";
  import {uniqueArray, regionColor} from "./helper.js"
  import regions from './regions.js'

  export let selectedRegion;
  import BigButterfly from './BigButterfly.svelte';
  export let selectedCountry;
  export let definitions;
  export let warnings;
  export let questions;
  export let acqMode;
  export let butterflies;

  let colorScale = regionColor(regions);

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
        // let warn = warnings.message[0];
      }
    }

    if (selectedRegion !== "") {
      let color = colorScale(selectedRegion);
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
    <div class="container">
      <BigButterfly />
      <div class="definitions-warnings__container">
        <div class="definitions"></div>
        <div class="warnings"></div>
      </div>
    </div>
    <div id="documentation">
      <div id="warnings"></div>
      <div id="specification"></div>
      <div id="definitions"></div>
  </div>
  </section>
{/if}

<style>

  #documentation {
    display: flex;
    flex-direction: row;
  }

  #documentation div {
    background: rgb(211, 211, 211);
    max-height: 75px;
  }

  .definitions-warnings__container {
    display: flex;
    gap: 1rem;
    height: 30vh;
    width: 100%;
  }

  .definitions-warnings__container > div {
    width: 100%;
    height: 100%;
    background: #F5F5F5;
    border-radius: 8px;
  }

</style>