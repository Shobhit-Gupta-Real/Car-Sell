<script>
	import Caravacard from './Caravacard.svelte';
  
	  export let cars;
	  // Retrieve user store from context
  </script>
  
  <div class="cards">
  {#if cars && cars.length > 0}
  {#each cars as car}
  <Caravacard car={car}/>
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
  