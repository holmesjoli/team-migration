<script>
  import CountryCardContainer from './CountryCardContainer.svelte';
  import BigButterflyContainer from './BigButterflyContainer.svelte';
  
  export let selectedRegion;
  export let selectedCountry;
  export let datasets;

</script>

<CountryCardContainer bind:selectedRegion={selectedRegion} bind:selectedCountry={selectedCountry} data={datasets[3]}/>
<BigButterflyContainer bind:selectedCountry={selectedCountry} />