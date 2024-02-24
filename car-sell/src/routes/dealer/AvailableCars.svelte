<script>
  import Carcard from './Carcard.svelte';


    /** @type {import('./$types').PageData} */
    import { writable, derived } from 'svelte/store';
    import {navigate} from 'svelte-routing'
    import { onMount } from "svelte";
    const apiData = writable()
    import { getContext } from 'svelte';
    const user = getContext('user');
    const dealer = getContext('dealer')

</script>
<div class="cards">
{#if $dealer && $dealer.cars && $dealer.cars.length > 0}
    {#each $dealer.cars as car}
        <Carcard car={car.insertedId} />
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
