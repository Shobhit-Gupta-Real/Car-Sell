<script>
    import Carcard from './Carcard.svelte';
  
      import Dealerlist from './dealerlist.svelte';
   export let cars;
  
  </script>
  
  <div class="cards">
  {#if cars && cars.length > 0}
  {#each cars as car}
  <Dealerlist car={car}/>
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
  
  