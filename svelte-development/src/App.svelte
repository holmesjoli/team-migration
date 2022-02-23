<script>
  import { text, json } from 'd3';

  import Title from './TItle.svelte';
  import MapContainer from './MapContainer.svelte';
  import SmallMultiples from './SmallMultiples.svelte';
  import BigButterfly from './BigButterfly.svelte';
  import Overview from './Overview.svelte';
  import Footer from './Footer.svelte';

  export let datasets = [];

  let selectedRegion = "";
  
  const butterflies = ["asset/butterfly1.svg", "asset/butterfly2.svg"]

  let promise = getData();

  async function getData() {
    let mapCentroidsD = await json("data/mapData/region-centroids.geojson");
    let mapOutlineD = await json("data/mapData/world.geojson");
    let butterflySvg1 = await text(butterflies[0])
    let butterflySvg2 = await text(butterflies[1])
    let butterflySvgs = [butterflySvg1, butterflySvg2]
    datasets = [mapCentroidsD, mapOutlineD, butterflySvgs];
  }

</script>

<main>
  <Title />
  {#await promise then dataset}
    <MapContainer dataset={datasets} bind:selectedRegion={selectedRegion}/>
    <SmallMultiples bind:selectedRegion={selectedRegion}/>
  {/await}
</main>

<style>

</style>