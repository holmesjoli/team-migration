<script>
  import { format } from "d3"
  
  export let regionData;
  export let countryData;
  export let hoveredCountry;

  let countryValue;

  const formatValue = format(",")
  $: if (hoveredCountry !== "") {
    countryValue = countryData.filter(d => d.country == hoveredCountry);
    countryValue = countryValue[0].value;
  }
  
</script>

<div>
  <p class="user-signifier" style="padding-top: 10px;">
    Select a country to show various ways you can aquire citizenship.
  </p>
  {#if hoveredCountry !== ""}
    {#if hoveredCountry == "Taiwan" | hoveredCountry == "Kosovo"}
      <p style="padding-top: 10px;">
        The data is missing about the number of migrants in <span style="text-decoration: underline solid {regionData.color} 5px; text-underline-offset: 2px">{hoveredCountry}</span>.
      </p>
    {:else}
      <p style="padding-top: 10px;">
        <span style="text-decoration: underline solid {regionData.color} 5px; text-underline-offset: 2px">{hoveredCountry}</span> had a total of <span style="text-decoration: underline solid {regionData.color} 5px; text-underline-offset: 2px">{formatValue(countryValue)}</span> migrants in 2020.
      </p>
    {/if}
  {:else}
    <p style="color: white; padding-top: 10px;">
      Hover over the country.
    </p>
  {/if}
</div>

<style>
  p {
    line-height: 1.5;
    margin: 0;
  }
  span {
    font-weight: bold;
  }
  div {
    margin-bottom: 50px;
  }
</style>