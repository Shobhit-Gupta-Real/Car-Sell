<script>
  import Caravacard from './Caravacard.svelte';

	import { writable, derived } from 'svelte/store';
	import { getContext, setContext } from 'svelte';
	const user = getContext('user');
	const carsavailabe = getContext('carsavailabe')
	import { onMount } from "svelte";
	// Retrieve user store from context
</script>

<div class="cards">
{#if $carsavailabe && $carsavailabe.length > 0}
{#each $carsavailabe as car}
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
