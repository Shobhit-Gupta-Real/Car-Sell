<script>
    /** @type {import('./$types').PageData} */
    import {navigate} from 'svelte-routing'
    import {BACKEND_URL} from '../env.js'
    let username = '';
    let password = '';
    const handlesignup = async() => {
    const response = await fetch(`${BACKEND_URL}/dealersignup`,{
      method:'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include'
    })
    if(response.status === 200){
        alert('Signed up!')
        navigate('/dealer')
        window.location.reload();
    }else{
        alert('Registration Failed!')
    }
};
</script>
<form on:submit|preventDefault={handlesignup} class="max-w-400 mx-auto gap-2 flex flex-col bg-purple-400 p-8 rounded-2xl mt-12">
    <h1 class="text-2xl font-bold block bg-transparent text-center">Dealer SignUp</h1>
    <label for="username">Username:</label>
    <input type="text" id="username" class="box-border block mb-5 w-full py-2 px-3 text-lg border-2 border-gray-400 bg-gray-200 rounded hover:border-purple-500" bind:value={username} />
    
    <label for="password">Password:</label>
    <input type="password" id="password" class="box-border block mb-5 w-full py-2 px-3 text-lg border-2 border-gray-400 bg-gray-200 rounded hover:border-purple-500" bind:value={password} />
    
    <button type="submit" class="block p-4 text-base bg-blue-300 border border-blue-300 rounded hover:bg-purple-300 focus:bg-orange-300">SignUp</button>
</form>
<style>

</style>