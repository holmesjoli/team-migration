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
  
  const butterflies = ["asset/butterfly1.svg", "asset/butterfly2.svg"]

  let promise = getData();

  async function getData() {
    let mapCentroidsD = await json("data/mapData/region-centroids.geojson");
    let mapOutlineD = await json("data/mapData/world.geojson");
    let butterflySvg1 = await text(butterflies[0])
    let butterflySvg2 = await text(butterflies[1])
    let butterflySvgs = [butterflySvg1, butterflySvg2]
    let byCountryD = await csv("data/acq_by_country.csv")
    let warnings = await csv("data/warnings.csv")
    let definitions = await csv("data/definitions.csv")
    let questions = await csv("data/questions.csv")
    let acqMode = await csv("data/modes_acq.csv")
    let regions = await csv("data/regions.csv")
    let regionFlow = await csv("data/region_flows.csv")
    let totalMigrants = await csv("data/total_migrants.csv")
    datasets = [mapCentroidsD, mapOutlineD, butterflySvgs, byCountryD, warnings,
    definitions, questions, acqMode, regions, regionFlow, totalMigrants];
    parseData(datasets);
    console.log(datasets)
  }

  function parseData(datasets) {
    // parse byCountryD
    datasets[3].map(d => {
      d.n_acq_modes = +d.n_acq_modes;
    })

    // parse by regionFlow
    datasets[9].map(d => {
      d.value = +d.value;
    })

    // parse totalMigrants
    datasets[10].map(d => {
      d.TOTAL_MIGRANTS = +d.TOTAL_MIGRANTS;
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
    <Overview />
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