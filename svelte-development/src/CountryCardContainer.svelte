<script>
  import { format, max } from 'd3'
  import CountryCardExplainer from './CountryCardExplainer.svelte';
  import CountryCards from './CountryCards.svelte'

  export let selectedRegion;
  export let selectedCountry;
  export let countryData;
  export let regionData;

  let hoveredCountry = "";

  const formatValue = format(",")
  let filteredData = countryData.filter(d => d.region == selectedRegion);
</script>

<section>
  <div>
    <h1>
      <span class="highlight" style="background-color: {regionData.color}">{selectedRegion}</span>
    </h1>
    <CountryCardExplainer bind:hoveredCountry={hoveredCountry} regionData={regionData} countryData={filteredData}/>
  </div>
  <CountryCards bind:selectedRegion={selectedRegion} bind:selectedCountry={selectedCountry} bind:hoveredCountry={hoveredCountry} data={filteredData} color={regionData.color}/>
</section>

<style>
  div {
    max-width: 900px;
    margin: 0 auto;
  }
  h1 {
    font-weight: normal;
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
