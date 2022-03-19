<script>
  import { spring } from "svelte/motion";
  import { getContext } from 'svelte';
  import { scaleLinear, extent, select, scaleOrdinal } from 'd3';
  import { forceSimulation, forceCollide, forceLink, forceX, forceY } from "d3-force";
  
  import Popup from './Popup.svelte';
  import regions from './regions.js';

  export let width;
  export let regionFlow;
  export let datasets;
  export let data;
  export let projection;
  export let butterflies;
  export let selectedRegion;
  export let hoveredRegionCode;
  export let selectedCountry;

  let dataset = [datasets[0].features, datasets[3], datasets[4], datasets[5], datasets[6], datasets[7], datasets[8], datasets[10], datasets[11]]

  const { open } = getContext('simple-modal');

  const sScale = scaleLinear()
    .domain(extent(data.features, d => d.properties.VALUE))
    .range([0.25, width / 1200]);

  const pathScale = scaleLinear()
    .domain(extent(regionFlow, d => d.value))
    .range([1, 20]);

  const colorScale = scaleOrdinal()
    .domain(regions.map(function(d) {return d.name; }))
    .range(regions.map(function(d) {return d.color; }))

  let butterflyPoints = spring(data.features.map(d => ({
    x: 0,
    y: 0,
    value: 0,
    subregion: 0,
    regionIndex: 0,
    regionCode: 0,
  })),
    {
      stiffness: 1,
      damping: 1
    }
  )

  $: {
    sScale.range([0.25, width / 1200]);

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
      subregion: d.properties.SUBREGION,
      regionIndex: findRegionIndex(d.properties.SUBREGION),
      regionCode: findRegionCode(d.properties.SUBREGION)
    }))
    butterflyPoints.set(newButterflyPoints)

  }

  function handleMouseOver() {
    select(this).attr('fill-opacity', 1);

    let hoverRegionIndex = select(this).attr('data-region-index');
    hoveredRegionCode = regions[hoverRegionIndex].code;

    let x2 = $butterflyPoints.filter(d => d.regionCode == hoveredRegionCode)[0].x;
    let y2 = $butterflyPoints.filter(d => d.regionCode == hoveredRegionCode)[0].y;
    let destRegion = $butterflyPoints.filter(d => d.regionCode == hoveredRegionCode)[0].subregion;

    let values = regionFlow
      .filter(d => d.DEST === hoveredRegionCode)
      .filter(d => d.DEST !== d.ORIG);

    let links = []
    for (let v of values) {

      let x1=$butterflyPoints.filter(d => d.regionCode == v.ORIG)[0].x;
      let y1=$butterflyPoints.filter(d => d.regionCode == v.ORIG)[0].y;

      v.x1 = x1;
      v.y1 = y1;
      v.x2 = x2;
      v.y2 = y2;
      v.subRegion = $butterflyPoints.filter(d => d.regionCode == v.ORIG)[0].subregion;
      v.destRegion = destRegion;
  
      links.push(v)
    }

    select("#world-map")
    .selectAll(".line")
    .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("x1", function(d) { return d.x1 })
      .attr("y1", function(d) { return d.y1 })
      .attr("x2", function(d) { return d.x1 })
      .attr("y2", function(d) { return d.y1 })
      .attr("stroke", function(d) { return colorScale(d.subRegion); })
      .attr("stroke-width", function(d) { return pathScale(d.value); })
      .attr("stroke-opacity", .5)
      .transition()
      .duration(2000)
      .attr("x1", function(d) { return d.x1 })
      .attr("y1", function(d) { return d.y1 })
      .attr("x2", function(d) { return d.x2 })
      .attr("y2", function(d) { return d.y2 })
      .attr("stroke", function(d) { return colorScale(d.destRegion); });

    // const lineGroup = groups(links, d => d.DEST);

    // let newLine = line()
    //   .x(function(d) { return projection(d.x); })
    //   .y(function(d) { return projection(d.y); });

    //   select("#world-map")
    //   .selectAll(".line")
    //   .data(lineGroup)
    //   .join("path")
    //       .attr("fill", "none")
    //       .attr("stroke", "black")
    //       .attr("stroke", 2)
    //       .attr("d", function(d) { return newLine(d[1]); });
  }

  function handleMouseOut() {
    hoveredRegionCode = "";

    if (select(this).attr('data-region-index') != findRegionIndex(selectedRegion)) {
      select(this).attr('fill-opacity', 0.5)
    }

    select("#world-map")
      .selectAll(".link")
      .remove()
  }

  function handleClick() {
    select(".map-points").selectAll("use").attr('fill-opacity', 0.5);
    select(this).attr('fill-opacity', 1);
    let selectedRegionIndex = select(this).attr('data-region-index');
    selectedRegion = regions[selectedRegionIndex].name;
    open(Popup, { selectedRegion: selectedRegion, selectedCountry: selectedCountry, datasets: dataset, butterflies: butterflies});

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

  function findRegionCode(region) {
    let regionIndex = regions.findIndex(re => re.name === region);
    return +regions[regionIndex].code;
  }
</script>

<g class="map-points">
  <defs>
    <g id="butterfly-0">
      {@html butterflies[0]}
    </g>
  </defs>

  {#each $butterflyPoints as {x, y, value, regionIndex, regionCode}}
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
          xlink:href="#butterfly-0"
          transform='scale({sScale(value)})'
          stroke="{regions[regionIndex].color}"
          stroke-width=1
          fill="{regions[regionIndex].color}"
          fill-opacity="0.5"
          data-region-index="{regionIndex}"
          data-region-code="{regionCode}"
          data-value="{value}"
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

