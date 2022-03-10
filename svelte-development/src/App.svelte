<script>
  import { text, json, csv } from 'd3';

  import Title from './TItle.svelte';
  import MapContainer from './MapContainer.svelte';
  import CountryCardContainer from './CountryCardContainer.svelte';
  import BigButterflyContainer from './BigButterflyContainer.svelte';
  import Overview from './Overview.svelte';
  import Footer from './Footer.svelte';

  export let datasets = [];

  let selectedRegion = "";
  let hoveredRegionCode = "";
  let selectedCountry = "";
  
  const butterflies = ["asset/butterfly1.svg", "asset/butterfly2.svg", "asset/butterflyPath.svg"]

  let promise = getData();

  async function getData() {
    let mapCentroidsD = await json("data/mapData/region-centroids.geojson");
    let mapOutlineD = await json("data/mapData/world.geojson");
    let butterflySvg1 = await text(butterflies[0])
    let butterflySvg2 = await text(butterflies[1])
    let butterflySvg3 = await text(butterflies[2])
    let butterflySvgs = [butterflySvg1, butterflySvg2, butterflySvg3]
    let byCountryD = await csv("data/by_country.csv")
    let warnings = await csv("data/warnings.csv")
    let definitions = await csv("data/definitions.csv")
    let questions = await csv("data/questions.csv")
    let acqMode = await csv("data/modes_acq.csv")
    let regions = await csv("data/regions.csv")
    let regionFlow = await csv("data/region_flows.csv")
    let questionsToMode = await csv("data/questions_modes.csv")
    let modeA06a = await csv("data/modeA06a.csv")
    datasets = [mapCentroidsD, mapOutlineD, butterflySvgs, byCountryD, warnings,
    definitions, questions, acqMode, regions, regionFlow, questionsToMode, modeA06a];
    parseData(datasets);
  }

  function parseData(datasets) {
    // parse byCountryD
    datasets[3].map(d => {
      d.value = +d.value;
    })

    // parse by regionFlow
    datasets[9].map(d => {
      d.value = +d.value;
    })
  }

</script>

<main>
  <Title />
  {#await promise}
    <div>
      Loading...
    </div>
  {:then dataset}
    <MapContainer dataset={datasets} bind:selectedRegion={selectedRegion} bind:hoveredRegionCode={hoveredRegionCode} bind:selectedCountry={selectedCountry}/>

  {/await}
</main>

<style>
  div {
    height: 40vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>