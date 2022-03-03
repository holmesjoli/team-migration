<script>
  import CountryCards from './CountryCards.svelte'

  export let selectedRegion;
  export let selectedCountry;
  export let data;

  console.log(data);

</script>

<section>
  <h1>
    {selectedRegion}
  </h1>
  <CountryCards bind:selectedRegion={selectedRegion} bind:selectedCountry={selectedCountry} data={data}/>
</section>