<script>
import { select } from "d3";

  export let selectedCountry;
  export let definitions;
  export let warnings;
  export let questions;
  export let acqMode;

  acqMode = acqMode.filter(function(d) {
    d.country === selectedCountry;
  });

    console.log(selectedCountry);
  console.log(definitions);
  console.log(warnings);
  console.log(questions);
  console.log(acqMode);


  $: {
  }
</script>

{#if selectedCountry !== ""}
  <section class="big-butterfly__container">
    <h1>
      Paths to citizenship in {selectedCountry}
    </h1>
    <div id="citizenship-paths">
      <div id="citizenship-paths"></div>
      <div id="documentation">
        <div id="warnings"></div>
        <div id="specification"></div>
        <div id="definitions"></div>
      </div>
    </div>
  </section>
{/if}

<style>
  div {
    height: 50vh;
    background: gray;
    color: white;
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