<script>
  import CountryCardContainer from './CountryCardContainer.svelte';
  import BigButterflyContainer from './BigButterflyContainer.svelte';
  import regions from "./regions"
  
  export let selectedRegion;
  export let selectedCountry;
  export let datasets;
  export let butterflies;

  // region data for country cards
  let selectedRegionValue = datasets[0].filter(d => d.properties.SUBREGION == selectedRegion)
  selectedRegionValue = selectedRegionValue[0].properties.VALUE
  let selectedRegionColor = regions.filter(d => d.name == selectedRegion)[0].color
  let selectedRegionData = { value: selectedRegionValue, color: selectedRegionColor }
</script>

<CountryCardContainer bind:selectedRegion={selectedRegion} bind:selectedCountry={selectedCountry} countryData={datasets[1]} regionData={selectedRegionData}/>
<BigButterflyContainer bind:selectedCountry={selectedCountry} bind:selectedRegion={selectedRegion} warnings={datasets[2]} definitions={datasets[3]} questions={datasets[4]} acqMode={datasets[5]} questionToMode={datasets[7]} butterflies={butterflies} modeA06a={datasets[8]}/>
