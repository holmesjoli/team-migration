<script>
  import { select, selectAll } from 'd3';
  
  import regions from './regions.js'

  export let selectedRegion;
  export let selectedCountry;
  export let data;

  let selectedRegionD, selectedRegionInfo;

  $: {
    selectedRegionD = data.filter(d => d.subregion == selectedRegion);
    selectedRegionInfo = findSelectedRegionInfo(selectedRegion);
  }

  function findSelectedRegionInfo(region) {
    if (region !== "") {
      let index = regions.findIndex(re => re.name == region)
      let color = regions[index].color;
      let shape = regions[index].shape;
      return {color: color, shape: shape};
    }
  }

  function handleMouseOver() {
    let use = select(this).select("use")
    let color = use.attr("data-color")
    // let country = use.attr("data-country")
    select(this).style("background", color)
    use.attr('fill', "white").attr('stroke', "white")
    select(this).select(".country-card__country-name").style("color", "white")
  }

  function handleMouseLeave() {
    let use = select(this).select("use")
    if (selectedCountry !== use.attr("data-country")) {
      let color = use.attr("data-color")
      select(this).style("background", "white")
      use.attr('fill', color).attr('stroke', color)
      select(this).select(".country-card__country-name").style("color", "black")
    }
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
    selectedCountry = use.attr("data-country")
  }


</script>

<div class="country-cards__container">
  {#if selectedRegion !== ""}
    {#each selectedRegionD as d}
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
              transform="translate({selectedRegionInfo.shape == 0 ? 4.5 : 1.5}, {selectedRegionInfo.shape == 0 ? 13 : 6.5})"
              xlink:href="#butterfly-{selectedRegionInfo.shape}"
              stroke="{selectedRegionInfo.color}"
              stroke-width=1
              fill="{selectedRegionInfo.color}"
              data-country="{d.country}"
              data-color="{selectedRegionInfo.color}"
            />
          </svg>
        </div>
        <div
          class="country-card__country-name"
          style="color: black;">
          {d.country}
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