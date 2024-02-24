<script>
	import { getContext, setContext } from 'svelte';
	const usercatalogue = getContext('usercatalogue')
	import {BACKEND_URL} from '../env.js'

	// Retrieve user store from context
	export let car;
	const buy = async() =>{
		const response = await fetch(`${BACKEND_URL}/cars/${car._id}/buy/${$usercatalogue._id}`,{
			credentials: 'include',
			method: 'POST'
		})
		if(response.status === 200){
			window.location.reload();
		}
	}
</script>

<div class="item">
<div class="card min-w-64 mx-auto gap-2 flex flex-col bg-slate-300 p-8 rounded-2xl mt-12 gap-6">
	<h1 class="font-bold text-2xl p-2 rounded-2xl">Car Details </h1>
		<h1 class="font-bold text-xl text-center bg-red-400 p-2 rounded-xl" >{car.Type}</h1> 
		<div class="near">
		<h2 class="font-bold text-xl text-slate-600">Name: {car.name}</h2>
		<p class="font-bold text-xl text-slate-600">Model: {car.model}</p></div>
		<button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-3xl" on:click={buy}>Buy</button>
	</div>
</div>

<style>

</style>

