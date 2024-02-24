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
<div class="card min-w-64 mx-auto gap-2 flex flex-col bg-purple-400 p-8 rounded-2xl mt-12">
        <h1 class="font-bold text-6xl">{$api?.Type}</h1>
        <h2 class="font-bold text-6xl">{$api?.name}</h2>
        <p class="font-bold text-6xl text-slate-600">{$api?.model}</p>
  </div>
</div>
<style>

</style>

