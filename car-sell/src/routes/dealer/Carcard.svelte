<script>

    /** @type {import('./$types').PageData} */
    import { writable, derived } from 'svelte/store';
    import { onMount } from "svelte";
    const api = writable()
    import {BACKEND_URL} from '../env.js'
    export let car;
    onMount(async()=>{
      const response = await fetch(`${BACKEND_URL}/cars/${car}`, {credentials: 'include'})
      const value = await response.json()
      api.set(value)
    },[])
</script>
<div class="item">
<div class="card min-w-64 mx-auto gap-2 flex flex-col bg-slate-300 p-8 rounded-2xl mt-12 gap-6">
  <h1 class="font-bold text-2xl p-2 rounded-2xl">Car Details </h1>
        <h1 class="font-bold text-xl text-center bg-red-400 p-2 rounded-xl">{$api?.Type}</h1>
        <div class="near">
        <h2 class="font-bold text-xl text-slate-600">Name: {$api?.name}</h2>
        <p class="font-bold text-xl text-slate-600">Model: {$api?.model}</p>
        </div>
  </div>
</div>
<style>

</style>

