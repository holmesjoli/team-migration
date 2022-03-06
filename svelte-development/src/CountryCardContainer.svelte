<script>
  import CountryCards from './CountryCards.svelte'

  export let selectedRegion;
  export let selectedCountry;
  export let data;

</script>

<section>
  <h1>
    {selectedRegion}
  </h1>
  <h2>Select country to see available paths of migration</h2>
  <CountryCards bind:selectedRegion={selectedRegion} bind:selectedCountry={selectedCountry} data={data}/>
</section>