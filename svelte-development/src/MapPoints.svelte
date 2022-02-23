<script>
  import { scaleLinear, extent, select, selectAll } from 'd3';
  import { forceSimulation, forceCollide, forceX, forceY } from "d3-force"

  export let data;
  export let projection;
  export let butterflies;
  export let selectedRegion;

  const sScale = scaleLinear().domain(extent(data.features, d => d.properties.VALUE)).range([0.25, 1])

  $: {
    const simulation = forceSimulation(data.features)
      .force("collide", forceCollide().radius(d => sScale(d.properties.VALUE) * 55))
      .force("x", forceX().x(d => projection(d.geometry.coordinates)[0]))
      .force("y", forceY().y(d => projection(d.geometry.coordinates)[1]))
      .stop()
      .tick(100)
  }

  function handleMouseOver() {
    select(this).attr('fill-opacity', 1)
  }

  function handleMouseOut() {
    if (select(this).attr('data-region') != selectedRegion) {
      select(this).attr('fill-opacity', 0.5)
    }
  }

  function handleClick() {
    selectAll("use").attr('fill-opacity', 0.5)
    select(this).attr('fill-opacity', 1)
    selectedRegion = select(this).attr('data-region')
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
  {#each data.features as d}
    <g
      class="butterfly-container"
      transform="translate({sScale(d.properties.VALUE) * -50}, {sScale(d.properties.VALUE) * -50})"
    >
      <g
      class="butterfly"
      transform="translate({d.x}, {d.y}) rotate({Math.random() * 60 - 30})"
    >
      <!-- svelte-ignore a11y-mouse-events-have-key-events -->
      <use
        on:mouseover={handleMouseOver}
        on:mouseout={handleMouseOut}
        on:click={handleClick}
        xlink:href="#butterfly-1"
        transform='scale({sScale(d.properties.VALUE)})'
        stroke="coral"
        stroke-width=1
        fill="coral"
        fill-opacity="0.5"
        data-region="{d.properties.SUBREGION}"
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

