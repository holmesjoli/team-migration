<script>
  import { geoNaturalEarth1, geoPath } from "d3-geo";

  import MapPath from './MapPath.svelte';
  import MapPoints from './MapPoints.svelte';

  export let dataset;
  export let selectedRegion;

  let centroidsD = dataset[0];
  let outlineD = dataset[1];
  let butterflies = dataset[2];

  let w;

  $: h = 5 * w / 9;
  $: projection = geoNaturalEarth1().fitSize([w, h], outlineD)
  $: path = geoPath(projection)

</script>

<div class="container" bind:clientWidth={w}>
  {#if w !== undefined}
    <svg width={w} height={h}>
      <MapPath data={outlineD} path={path}/>
      <MapPoints data={centroidsD} projection={projection} butterflies={butterflies} bind:selectedRegion={selectedRegion}/>
    </svg>
  {/if}
</div>

<style>
</style>