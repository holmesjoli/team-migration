<script>
    import { scaleLinear, extent } from "d3";
    
    export let data;
    export let width;
    export let height;

    const sScale = scaleLinear()
      .domain(extent(data.features, d => d.properties.VALUE))
      .range([0.25, width / 1200]);
    let legendH = 400;

    let legendD = [
      { value: 1000000, text: "< 1 million" },
      { value: 5000000, text: "< 5 million" },
      { value: 19715729, text: "> 5 million" }
    ];

    legendD.map(d => {
      d.width = sScale(d.value) * 91;
      d.height = sScale(d.value) * 74;
      return d;
    })

    $: {
      sScale.range([0.25, width / 1200]);
    }
</script>

{#if height !== undefined}
  <div>
    Total # of migrants to a region
  </div>
    {#if width > 1220 * 0.9}
    <svg
      width=200
      height={legendH}
    >
      <g>
        {#each legendD as {width, height, value, text}, i}
          <use
            xlink:href="#butterfly-0"
            transform='translate({100 - width / 2}, {15 + i * 65 + height / 2}) scale({sScale(value)}, {sScale(value)})'
            stroke="black"
            stroke-width=1
            fill="black"
            fill-opacity="0.5"
          />
          <text
            x=100
            y={5 + i * 65 + height / 2}
            text-anchor="middle"
          >
            {text}
          </text>
        {/each}
      </g>
      </svg>
    {:else}
    <svg
    width={width - 200}
    height={120}
  >
      <g>
        {#each legendD as {width, height, value, text}, i}
          <use
            xlink:href="#butterfly-0"
            transform='translate({50 + 75 * i + width / 2}, {70 - height / 2}) scale({sScale(value)}, {sScale(value)})'
            stroke="black"
            stroke-width=1
            fill="black"
            fill-opacity="0.5"
          />
          <text
            x={50 + 85 * i + width / 2}
            y={60 - height / 2}
            text-anchor="middle"
          >
            {text}
          </text>
        {/each}
      </g>
    </svg>
    {/if}
{/if}

<style>
  div {
    padding: 0 1rem 1rem 1rem;
    font-weight: bold;
    line-height: 1.2;
    text-align: center;
  }
  @media (max-width: 1220px) {
    div {
      margin-top: 0;
      padding: 0;
      text-align: left;
    }
  }
</style>