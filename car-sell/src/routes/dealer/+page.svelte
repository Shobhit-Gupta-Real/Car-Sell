<script>
  import AvailableCars from './AvailableCars.svelte';

  import Caraddform from './Caraddform.svelte';

    /** @type {import('./$types').PageData} */
    import { writable, derived } from 'svelte/store';
    import {navigate} from 'svelte-routing'
    import { onMount, afterUpdate } from "svelte";
    const take = writable()
    import { getContext, setContext } from 'svelte';
    import Soldcars from './Soldcars.svelte';
    const user = getContext('user');
    const page = writable()
    take.set({})
    page.set(1)
    const addcar=()=>{
      page.set(2)
    }
    const available= async()=>{
      page.set(1)
    }
    const sold=async()=>{
      page.set(3)
    }
    
    afterUpdate(async()=>{
      const response = await fetch(`http://localhost:3000/dealer/${$user.username}`, {credentials: 'include'})
      const value = await response.json()
      take.set(value)
    })
    
setContext('dealer', take)
</script>
<div class="mainpage">
<div class='sidebar'>
<section class='options' style={{borderBottom:"2px solid rgb(199, 199, 199)"}}>
<span>Dealer Options</span>
<button on:click={available}><div>1</div> Cars Available</button>
<button on:click={addcar}><div>2</div> Add Cars</button>
<button on:click={sold}><div>3</div> Cars Sold</button>
</section>
</div>

{#if $page === 1}
    <AvailableCars />
{:else if $page === 2}
    <Caraddform />
    <!-- Show Component2 if page is 2 -->
{:else if $page === 3}
<Soldcars/>
    <!-- Show Component3 if page is 3 -->
    
{/if}
</div>
<style>
.mainpage{
  display: flex;
  gap: 3rem;
}
.sidebar{
display: flex;
width: 22rem;
height: 100vh;
padding: 0.99375rem;
justify-content: space-between;
flex-direction: column;
align-items: flex-start;
flex-shrink: 0;
border-radius: 0rem 1.325rem 1.325rem 0rem;
background: #F3E8FF;
}
.sidebar span{
  margin-left: 1rem;
  font-size: larger;
  font-weight: 500;
}
.options{
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 6rem;
  margin-left: 1rem;
}
.options button{
display: flex;
height: 3.5rem;
width: 17rem;
padding-left: 1rem;
align-items: center;
gap: 0.99375rem;
flex-shrink: 0;
align-self: stretch;
font-family: Roboto;
font-size: 0.875rem;
font-style: normal;
font-weight: 500;
line-height: 1.25rem; /* 142.857% */
letter-spacing: 0.00625rem;
}
.options button:hover{
  align-items: center;
  align-self: stretch;
  border-radius: 8.28125rem;
  background-color: #1D1B2014;
  width: 17rem;
}
.options button:focus{
  background-color: #7E22CE;
  border-radius: 8.28125rem;
  width: 17rem; 
  color: #FFF;
}
.options button:focus div{
  background-color: black;
}
.options button div{
display: flex;
width: 2.5rem;
height: 2.5rem;
padding: 0.5rem;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 0.625rem;
flex-shrink: 0;
background-color: #1D1B201F;
border-radius: 50%;
}
</style>