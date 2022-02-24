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
  let selectedCountry = "";
  
  const butterflies = ["asset/butterfly1.svg", "asset/butterfly2.svg"]

  let promise = getData();

  async function getData() {
    let mapCentroidsD = await json("data/mapData/region-centroid.geojson");
    let mapOutlineD = await json("data/mapData/world.geojson");
    let butterflySvg1 = await text(butterflies[0])
    let butterflySvg2 = await text(butterflies[1])
    let butterflySvgs = [butterflySvg1, butterflySvg2]
    let byCountryD = await csv("data/acq_by_country.csv")
    datasets = [mapCentroidsD, mapOutlineD, butterflySvgs, byCountryD];
    parseData(datasets);
  }

  function parseData(datasets) {
    // parse byCountryD
    datasets[3].map(d => {
      d.n_acq_modes = +d.n_acq_modes;
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
    <MapContainer dataset={datasets} bind:selectedRegion={selectedRegion} bind:selectedCountry={selectedCountry}/>
    <CountryCardContainer bind:selectedRegion={selectedRegion} bind:selectedCountry={selectedCountry} data={datasets[3]}/>
    <BigButterflyContainer bind:selectedCountry={selectedCountry} />
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