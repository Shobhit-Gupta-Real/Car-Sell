<script>
    /** @type {import('./$types').PageData} */
    import { getContext } from 'svelte';
    import {BACKEND_URL} from '../env.js'
    const user = getContext('user');
    
    let Type = ''
    let name = ''
    let model = ''
    const addcar = async() =>{
      const response = await fetch(`${BACKEND_URL}/dealer/addcar/${$user.username}`,{
      method:'POST',
      body: JSON.stringify({Type, name, model}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
      })
      if(response.status===200){
        alert('Added Car!')
      }else{
        alert('Not Added!')
    }
    }
</script>
<div class="addcar ml-50">
  <form on:submit|preventDefault={addcar} class="bg-white p-8 rounded-lg shadow-xl w-96 mt-12">
    <h1 class="text-2xl font-bold mb-8 text-purple-600">Add Car</h1>
    <label for="Type">Type:</label>
    <input type="text" id="Type" class="box-border block mb-5 w-full py-2 px-3 text-lg border-2 border-gray-400 bg-gray-200 rounded hover:border-purple-500" bind:value={Type} />
    
    <label for="name">Name:</label>
    <input type="text" id="name" class="box-border block mb-5 w-full py-2 px-3 text-lg border-2 border-gray-400 bg-gray-200 rounded hover:border-purple-500" bind:value={name} />
    
    <label for="model">Model:</label>
    <input type="text" id="model" class="box-border block mb-5 w-full py-2 px-3 text-lg border-2 border-gray-400 bg-gray-200 rounded hover:border-purple-500" bind:value={model} />
    
    <button type="submit" class="bg-purple-600 text-white rounded py-2 px-4 shadow-lg">ADD</button>
    </form>
</div>

<style>

</style>

