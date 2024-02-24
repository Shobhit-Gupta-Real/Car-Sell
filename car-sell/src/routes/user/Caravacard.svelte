<script>
	import { writable, derived } from 'svelte/store';
	import { getContext, setContext } from 'svelte';
	const user = getContext('user');
	const usercatalogue = getContext('usercatalogue')
	import { onMount } from "svelte";
	
	// Retrieve user store from context
	export let car;
	const buy = async() =>{
		const response = await fetch(`http://localhost:3000/cars/${car._id}/buy/${$usercatalogue._id}`,{
			credentials: 'include',
			method: 'POST'
		})
		if(response.status === 200){
			window.location.reload();
		}
	}
</script>

<div class="item">
<div class="card min-w-64 mx-auto gap-2 flex flex-col bg-purple-400 p-8 rounded-2xl mt-12 gap-6">
		<h1 class="font-bold text-6xl">{car.Type}</h1>
		<h2 class="font-bold text-6xl">{car.name}</h2>
		<p class="font-bold text-6xl text-slate-600">{car.model}</p>
		<button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" on:click={buy}>Buy</button>
	</div>
</div>

<style>

</style>

