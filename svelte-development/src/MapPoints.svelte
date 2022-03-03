<script>
  import { spring } from "svelte/motion";
  import { getContext } from 'svelte';
  import { scaleLinear, extent, min, max, select, selectAll, groups, line } from 'd3';
  import { forceSimulation, forceCollide, forceLink, forceX, forceY } from "d3-force";
  
  import Popup from './Popup.svelte';
  import regions from './regions.js';

  export let regionFlow;
  export let datasets;
  export let data;
  export let projection;
  export let butterflies;
  export let selectedRegion;
  export let hoveredRegionCode;
  export let selectedCountry;

  let links = [];

  const { open } = getContext('simple-modal');

  const sScale = scaleLinear()
    .domain(extent(data.features, d => d.properties.VALUE))
    .range([0.25, 1]);

  const pathScale = scaleLinear()
    .domain(extent(regionFlow, d => d.value))
    .range([1, 10]);

  let butterflyPoints = spring(data.features.map(d => ({
    x: 0,
    y: 0,
    value: 0,
    regionIndex: 0,
    regionShape: 0,
    regionCode: 0,
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
      .force("link", forceLink()
                    .id(function(d) {
                        return d.CODE;}))
      .stop()
      .tick(100)

    let newButterflyPoints = data.features.map(d => ({
      x: d.x,
      y: d.y,
      value: d.properties.VALUE,
      regionIndex: findRegionIndex(d.properties.SUBREGION),
      regionShape: findRegionShape(d.properties.SUBREGION),
      regionCode: findRegionCode(d.properties.SUBREGION)
    }))
    butterflyPoints.set(newButterflyPoints)
  }

  function handleMouseOver() {
    select(this).attr('fill-opacity', 1);

    let hoverRegionIndex = select(this).attr('data-region-index');
    hoveredRegionCode = regions[hoverRegionIndex].code;

    links = regionFlow
      .filter(d => d.CODE === hoveredRegionCode)
      .filter(d => d.CODE !== d.ORIG); // Why are there some duplicates???
    links = [
      ...new Map(links.map((link) => [link.ORIG, link])).values(),
    ];
  }

  function handleMouseOut() {
    if (select(this).attr('data-region-index') != findRegionIndex(selectedRegion)) {
      select(this).attr('fill-opacity', 0.5)
    }
    links = undefined;
  }

  function handleClick() {
    select(".map-points").selectAll("use").attr('fill-opacity', 0.5);
    select(this).attr('fill-opacity', 1);
    let selectedRegionIndex = select(this).attr('data-region-index');
    selectedRegion = regions[selectedRegionIndex].name;
    open(Popup, { selectedRegion: selectedRegion, selectedCountry: selectedCountry, datasets: datasets });

    if (selectedCountry !== "") {
      let container = select(".country-cards__container");
      let color = select(this).attr("fill");
      container.selectAll('.country-card').style("background", "white");
      container.selectAll("use").attr("fill", color).attr("stroke", color);
      container.selectAll(".country-card__country-name").style("color", "black");
      selectedCountry = "";
    }
  }

  function findRegionIndex(region) {
    return regions.findIndex(re => re.name === region)
  }

  function findRegionShape(region) {
    let regionIndex = regions.findIndex(re => re.name === region)
    return regions[regionIndex].shape
  }

  function findRegionCode(region) {
    let regionIndex = regions.findIndex(re => re.name === region);
    return +regions[regionIndex].code;
  }

  function setDasharray() {
    console.log("1 second");
    dasharray = "1 3" ? "1 1" : "1 3"
    setTimeout(setDasharray, 1000);
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

  <g class="link-lines">
    {#if links !== undefined}
      {#each links as {CODE, ORIG, value}}
      <!-- svelte-ignore component-name-lowercase -->
        <line
          x1={$butterflyPoints.filter(d => d.regionCode == ORIG)[0].x}
          y1={$butterflyPoints.filter(d => d.regionCode == ORIG)[0].y}
          x2={$butterflyPoints.filter(d => d.regionCode == CODE)[0].x}
          y2={$butterflyPoints.filter(d => d.regionCode == CODE)[0].y}
          data-orig={ORIG}
          data-code={CODE}
          data-value={value}
          stroke="gray"
          stroke-width={pathScale(value)}
          stroke-dasharray="1 {pathScale(value) * 2}"
          stroke-linecap="round"
        ></line>
      {/each}
    {/if}
  </g>

  {#each $butterflyPoints as {x, y, value, regionIndex, regionShape, regionCode}}
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
          data-region-code="{regionCode}"
        />
      </g>
    </g>
  {/each}
</g>

<style>
  use {
    cursor: pointer;
  }

  .butterfly {
    transform-origin: top left;
  }
</style>

