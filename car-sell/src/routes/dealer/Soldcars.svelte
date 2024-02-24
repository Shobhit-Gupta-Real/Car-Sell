<script>
    import Carcard from './Carcard.svelte';
  
  
      /** @type {import('./$types').PageData} */
      import { writable, derived } from 'svelte/store';
      import { getContext } from 'svelte';
    import Solditem from './Solditem.svelte';
      const user = getContext('user');
      const dealer = getContext('dealer')
  </script>
  <div class="cards">
  {#if $dealer && $dealer.soldcars && $dealer.soldcars.length > 0}
      {#each $dealer.soldcars as car}
          <Solditem car={car}/>
      {/each}
  {:else}
      <p>No cars available</p>
  {/if}
  </div>
  <style>
  .cards{
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }
  </style>
  