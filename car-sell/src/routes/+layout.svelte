<script>
	import { setContext } from 'svelte';
    import { onMount } from "svelte";
	import { writable, derived } from 'svelte/store';
    import { append } from 'svelte/internal';
    import {navigate} from 'svelte-routing'
    import { BACKEND_URL } from './env.js';
    const apiData = writable()
    const inout = writable()
    onMount(()=>{
        fetch(`${BACKEND_URL}/profile`, {credentials: 'include'})
        .then(response=>{
            response.json().then(data=>{
                apiData.set(data);
                inout.set(true)
            })
        })
        
    })

    const loggingout = async() =>{
        const gone = await fetch(`${BACKEND_URL}/logout`,{
            credentials: 'include',
            method: 'POST',
        })
        if(gone.status === 200){
            inout.set(false)
        }
        navigate('/')
        window.location.reload();
    }
    setContext('user', apiData);
</script>

<div class="web">
<nav class="p-8 mx-20">
<div class="flex items-center justify-between">
    <div class="flex items-center">
    <img src="/carlogo.png" alt="Logo" class="h-12 w-12 mr-4 rounded-full" />
    <a href="/"><span class="text-purple-700 text-3xl font-bold">Car-Sell</span></a> 
    </div>
    {#if $inout}
    Welcome {$apiData.username}
    <button on:click={loggingout} class="bg-purple-700 hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded">
        Logout
    </button>
    {:else}
    <div class="logins">
        <a href="/userlogin"><button class="bg-purple-700 hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded">
        User Login
        </button></a>
        <a href="/dealerlogin"><button class="bg-purple-700 hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded">
        Dealer Login
        </button></a>
        </div>
    {/if}
</div>
</nav>
<slot>

</slot>
<footer class="bg-gray-800 mt-auto text-white py-4 text-center">
<div class="mx-auto">
    <p>&copy; 2024 Your Website. All rights reserved.</p>
</div>
</footer>
</div>


<style>
@import '../app.css';
</style>