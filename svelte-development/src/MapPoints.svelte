<script>
  import { spring } from "svelte/motion";
  import { scaleLinear, extent, select, selectAll } from 'd3';
  import { forceSimulation, forceCollide, forceX, forceY } from "d3-force"

  import regions from './regions.js';

  export let data;
  export let projection;
  export let butterflies;
  export let selectedRegion;
  export let selectedCountry;

  const sScale = scaleLinear().domain(extent(data.features, d => d.properties.VALUE)).range([0.25, 1])

  let butterflyPoints = spring(data.features.map(d => ({
    x: 0,
    y: 0,
    value: 0,
    regionIndex: 0,
    regionShape: 0,
  })),
    {
      stiffness: 1,
      damping: 1
    }
  )

  $: {
    const simulation = forceSimulation(data.features)
      .force("collide", forceCollide().radius(d => sScale(d.properties.VALUE) * 55))
      .force("x", forceX().x(d => projection(d.geometry.coordinates)[0]))
      .force("y", forceY().y(d => projection(d.geometry.coordinates)[1]))
      .stop()
      .tick(100)

    let newButterflyPoints = data.features.map(d => ({
      x: d.x,
      y: d.y,
      value: d.properties.VALUE,
      regionIndex: findRegionIndex(d.properties.SUBREGION),
      regionShape: findRegionShape(d.properties.SUBREGION)
    }))
    butterflyPoints.set(newButterflyPoints)
  }

  function handleMouseOver() {
    select(this).attr('fill-opacity', 1)
  }

  function handleMouseOut() {
    if (select(this).attr('data-region-index') != findRegionIndex(selectedRegion)) {
      select(this).attr('fill-opacity', 0.5)
    }
  }

  function handleClick() {
    select(".map-points").selectAll("use").attr('fill-opacity', 0.5)
    select(this).attr('fill-opacity', 1)
    let selectedRegionIndex = select(this).attr('data-region-index')
    selectedRegion = regions[selectedRegionIndex].name

    if (selectedCountry !== "") {
      let container = select(".country-cards__container")
      let color = select(this).attr("fill")
      container.selectAll('.country-card').style("background", "white")
      container.selectAll("use").attr("fill", color).attr("stroke", color)
      container.selectAll(".country-card__country-name").style("color", "black")
    }
  }

  function findRegionIndex(region) {
    return regions.findIndex(re => re.name === region)
  }

  function findRegionShape(region) {
    let regionIndex = regions.findIndex(re => re.name === region)
    return regions[regionIndex].shape
  }

</script>

<g class="map-points">
  <!-- {#each butterflies as {b}, i}
    <defs>
      <g id="butterfly-{i}">
        {@html b}
      </g>
    </defs>
  {/each} -->
  <defs>
    <g id="butterfly-0">
      {@html butterflies[0]}
    </g>
  </defs>
  <defs>
    <g id="butterfly-1">
      {@html butterflies[1]}
    </g>
  </defs>
  {#each $butterflyPoints as {x, y, value, regionIndex, regionShape}}
    <g
      class="butterfly-container"
      transform="translate({sScale(value) * -50}, {sScale(value) * -50})"
    >
      <g
      class="butterfly"
      transform="translate({x}, {y}) rotate({Math.random() * 60 - 30})"
    >
      <!-- svelte-ignore a11y-mouse-events-have-key-events -->
      <use
        on:mouseover={handleMouseOver}
        on:mouseout={handleMouseOut}
        on:click={handleClick}
        xlink:href="#butterfly-{regionShape}"
        transform='scale({sScale(value)})'
        stroke="{regions[regionIndex].color}"
        stroke-width=1
        fill="{regions[regionIndex].color}"
        fill-opacity="0.5"
        data-region-index="{regionIndex}"
      />
    </g>
    </g>
  {/each}
</g>

<style>
  use {
    cursor: pointer;
  }
</style>

