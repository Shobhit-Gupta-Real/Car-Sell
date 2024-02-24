<script>
 export let car;

</script>

<div class="item">
<div class="card min-w-64 mx-auto gap-2 flex flex-col bg-slate-300 p-8 rounded-2xl mt-12 gap-6">
	<h1 class="font-bold text-2xl p-2 rounded-2xl">Car Details </h1>
	<h1 class="font-bold text-xl text-center bg-red-400 p-2 rounded-xl" >{car.Type}</h1> 
	<div class="near">
	<h2 class="font-bold text-xl text-slate-600">Name: {car.name}</h2>
	<p class="font-bold text-xl text-slate-600">Model: {car.model}</p></div>
	</div>
</div>

<style>

</style>

