<script>
  import { format } from 'd3'
  import regions from './regions'

  export let hoveredRegionCode;
  export let data;

  console.log(regions)
  console.log(hoveredRegionCode)
  console.log(data)

  const formatValue = format(",")
  let hoveredRegionData, hoveredRegion;
  $: if(hoveredRegionCode !== "") {
    hoveredRegion = regions.filter(d => d.code == hoveredRegionCode)[0];
    hoveredRegion = hoveredRegion.name;
    console.log(hoveredRegion)
    let hoveredRegionValue = data.features.filter(d => d.properties.SUBREGION == hoveredRegion)
    hoveredRegionValue = hoveredRegionValue[0].properties.VALUE
    let hoveredRegionColor = regions.filter(d => d.name == hoveredRegion)[0].color
    hoveredRegionData = { value: hoveredRegionValue, color: hoveredRegionColor }
  }

</script>

<div>
  {#if hoveredRegionCode == ""}
    <p class="user-signifier">
      Hover over the butterflies to see how many people migrated into the region in 2020.<br><br>
    </p>
  {:else}
    <p>
      In 2020, <span style="text-decoration: underline solid {hoveredRegionData.color} 5px; text-underline-offset: 2px">{formatValue(hoveredRegionData.value)}</span> people migrated into <span class="highlight" style="background-color: {hoveredRegionData.color}">{hoveredRegion}</span>.
    </p>
    <p class="user-signifier">
      Click to show details on countries in the region.
    </p>
  {/if}
</div>

<style>
  div{
    height: 50px;
  }
  span {
    font-weight: bold;
  }
  span.highlight {
    color: white;
    padding: 0.3em 0.5em;
    border-radius: 8px;
  }
</style>