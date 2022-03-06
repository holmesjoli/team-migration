<script>
  import { geoNaturalEarth1, geoPath } from "d3-geo";

  import MapPath from './MapPath.svelte';
  import MapPoints from './MapPoints.svelte';
  import Legend from "./legend.svelte";

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

  let w;

  $: h = 5 * w / 9;
  $: projection = geoNaturalEarth1().fitSize([w, h], outlineD) // .rotate([45, 0, 0]) would cut out Alaska
  $: path = geoPath(projection)

</script>

<section class="map__container" bind:clientWidth={w}>
  {#if w !== undefined}
    <Modal show={$modal} transitionBgProps={{ duration: 0 }} styleCloseButton={{cursor: "pointer"}}>
      <div id="legend">
        <h2>Total # of migrants</h2>
        <svg height={h}>
          <Legend></Legend>
        </svg>
      </div>
      <svg id="world-map" width={w} height={h}>
        <MapPath data={outlineD} path={path}/>
        <MapPoints data={centroidsD} regionFlow ={regionFlow} projection={projection} butterflies={butterflies} bind:selectedRegion={selectedRegion} bind:hoveredRegionCode={hoveredRegionCode} bind:selectedCountry={selectedCountry} datasets={dataset}/>
      </svg>
    </Modal>
  {/if}
</section>

<style>
  .map__container {
    display: flex;
    flex-direction: row;
  }

  #legend {
    max-width: 10%;
    display: flex; 
    flex-direction: column; 
    text-align: center;
    padding: 10px;
  }

  #world-map {
    max-width: 90%
  }

</style>