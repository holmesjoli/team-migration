<script>
  import { geoNaturalEarth1, geoPath } from "d3-geo";

  import MapPath from './MapPath.svelte';
  import MapPoints from './MapPoints.svelte';
  import Legend from "./Legend.svelte";

  // Modal from https://svelte.dev/repl/033e824fad0a4e34907666e7196caec4?version=3.20.1
  import Modal from './Modal.svelte';
  import { modal } from './stores.js';

  export let dataset;
  export let selectedRegion;
  export let hoveredRegionCode;
  export let selectedCountry;

  let centroidsD = dataset[0];
  let outlineD = dataset[1];
  let butterflies = dataset[2];
  let regions = dataset[8];
  let regionFlow = dataset[9];
  let totalMigrants = dataset[10];

  let w;

  $: h = 5 * w / 9;
  $: projection = geoNaturalEarth1().fitSize([w, h], outlineD).rotate([-5, 0, 0])
  $: path = geoPath(projection)

</script>

<section class="map__container" bind:clientWidth={w}>
  {#if w !== undefined}
    <Modal show={$modal} transitionBgProps={{ duration: 0 }} styleCloseButton={{cursor: "pointer"}}>
      <svg id="world-map" width={w} height={h}>
        <MapPath data={outlineD} path={path}/>
        <MapPoints width={w} data={centroidsD} regionFlow ={regionFlow} projection={projection} butterflies={butterflies} bind:selectedRegion={selectedRegion} bind:hoveredRegionCode={hoveredRegionCode} bind:selectedCountry={selectedCountry} datasets={dataset}/>
      </svg>
      <div id="legend">
        <Legend width={w} height={h} data={centroidsD}/>
      </div>
    </Modal>
  {/if}
</section>

<style>
  .map__container {
    display: flex;
    position: relative
  }
  #legend {
    position: absolute;
    left: 0;
    bottom: 5vh;
    max-width: 200px;
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 1220px) {
    .map__container {
      flex-direction: column;
    }
    #legend {
      position: relative;
      max-width: unset;
    }
  }
</style>