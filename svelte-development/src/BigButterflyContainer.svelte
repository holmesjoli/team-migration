<script>
  export let selectedCountry;
  $: {
  }
</script>

{#if selectedCountry !== ""}
  <section class="big-butterfly__container">
    <h1>
      Paths to citizenship in {selectedCountry}
    </h1>
    <div>
      <h1>
        More stuff coming...
      </h1>
    </div>
  </section>
{/if}

<style>
  div {
    height: 50vh;
    background: gray;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>