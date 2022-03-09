<script>
  import CountryCardContainer from './CountryCardContainer.svelte';
  import BigButterflyContainer from './BigButterflyContainer.svelte';
  
  export let selectedRegion;
  export let selectedCountry;
  export let datasets;
  export let butterflies;
</script>

<CountryCardContainer bind:selectedRegion={selectedRegion} bind:selectedCountry={selectedCountry} data={datasets[0]}/>
<BigButterflyContainer bind:selectedCountry={selectedCountry} bind:selectedRegion={selectedRegion} warnings={datasets[1]} definitions={datasets[2]} questions={datasets[3]} acqMode={datasets[4]} questionToMode={datasets[5]} butterflies={butterflies}/>