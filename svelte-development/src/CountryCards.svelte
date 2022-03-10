<script>
  import { select, max, scaleLinear } from 'd3';

  export let selectedRegion;
  export let selectedCountry;
  export let hoveredCountry;
  export let data;
  export let color;

  let maxValue = max(data, d => d.value)
  let sizeScale = scaleLinear()
    .domain([0, maxValue])
    .range([0.3, 1]) 

  // should have a unified sizeScale between regions? but then some regions will just have small butterflies
  // let sizeScale = scaleLinear()
  //   .domain([0, 16793436])
  //   .range([0.3, 1]) 

  data.map(d => {
    d.value = isNaN(d.value) ? 0 : d.value
    d.xOffset = 4.5 + 45.5 - sizeScale(d.value) * 91 / 2;
    d.yOffset = 13 + 37 - sizeScale(d.value) * 74 / 2;
    return d;
  })

  function handleMouseOver() {
    let use = select(this).select("use")
    let color = use.attr("data-color")
    select(this).style("background", color)
    use.attr('fill', "white").attr('stroke', "white")
    select(this).select(".country-card__country-name").style("color", "white")
    hoveredCountry = use.attr("data-country")
  }

  function handleMouseLeave() {
    let use = select(this).select("use")
    if (selectedCountry !== use.attr("data-country")) {
      let color = use.attr("data-color")
      select(this).style("background", "white")
      use.attr('fill', color).attr('stroke', color)
      select(this).select(".country-card__country-name").style("color", "black")
    }
    hoveredCountry = ""
  }

  function handleClick() {
    let container = select(".country-cards__container")
    let use = select(this).select("use")
    let color = use.attr("data-color")
    container.selectAll('.country-card').style("background", "white")
    container.selectAll("use").attr('fill', color).attr('stroke', color)
    container.selectAll(".country-card__country-name").style("color", "black")

    select(this).style("background", color)
    use.attr('fill', "white").attr('stroke', "white")
    select(this).select(".country-card__country-name").style("color", "white")
    selectedCountry = use.attr("data-country");

    setTimeout(() => {
      select("#big-butterfly__container").select("h1").node().scrollIntoView({behavior: "smooth", block: "start"});
    }, 10);
  }


</script>

<div class="country-cards__container">
  {#if selectedRegion !== ""}
    {#each data as { value, country, xOffset, yOffset }}
      <!-- svelte-ignore a11y-mouse-events-have-key-events -->
      <div
        class="country-card"
        style="background: white"
        on:mouseover={handleMouseOver}
        on:mouseout={handleMouseLeave}
        on:click={handleClick}
      >
        <div class="country-card__butterfly">
          <svg width=100 height=100>
            <use
              transform="translate({xOffset}, {yOffset}) scale({sizeScale(value)}, {sizeScale(value)})"
              xlink:href="#butterfly-0"
              stroke="{color}"
              stroke-width=1
              fill="{color}"
              data-value="{value}"
              data-country="{country}"
              data-color="{color}"
            />
          </svg>
        </div>
        <div
          class="country-card__country-name"
          style="color: black;">
          {country}
        </div>
      </div>
    {/each}
  {/if}
</div>

<style>
  div.country-cards__container {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  div.country-card {
    width: calc(100px + 2rem);
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    height: fit-content;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.25);
  }
</style>