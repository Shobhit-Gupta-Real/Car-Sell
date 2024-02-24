<script>

    /** @type {import('./$types').PageData} */
    import { writable, derived } from 'svelte/store';
    import {navigate} from 'svelte-routing'
    import { onMount } from "svelte";
    const api = writable()
    import { getContext } from 'svelte';
    const user = getContext('user');
    const dealer = getContext('dealer')
    export let car;
    onMount(async()=>{
      const response = await fetch(`http://localhost:3000/cars/${car}`, {credentials: 'include'})
      const value = await response.json()
      api.set(value)
    },[])
</script>
<div class="item">
<div class="card max-w-800 mx-auto gap-2 flex flex-col bg-purple-400 p-8 rounded-2xl mt-12">
        <h1 class="font-bold text-6xl">{$api?.Type}</h1>
        <h2 class="font-bold text-6xl">{$api?.name}</h2>
        <p class="font-bold text-6xl text-slate-600">{$api?.model}</p>
  </div>
</div>
<style>

</style>

