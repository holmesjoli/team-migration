<script>
  import BigButterfly from './BigButterfly.svelte';

  export let selectedCountry;
  $: {
  }
</script>

{#if selectedCountry !== ""}
  <section class="big-butterfly__container">
    <h1>
      Ways to become a citizen of {selectedCountry}
    </h1>
    <div class="container">
      <BigButterfly />
      <div class="definitions-warnings__container">
        <div class="definitions"></div>
        <div class="warnings"></div>
      </div>
    </div>
  </section>
{/if}

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .definitions-warnings__container {
    display: flex;
    gap: 1rem;
    height: 30vh;
    width: 100%;
  }

  .definitions-warnings__container > div {
    width: 100%;
    height: 100%;
    background: #F5F5F5;
    border-radius: 8px;
  }

</style>