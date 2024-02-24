<script>
  import Cards from './Cards.svelte';

  import Mycars from './Mycars.svelte';


	import { writable, derived } from 'svelte/store';
	import { getContext, setContext, afterUpdate } from 'svelte';
	const user = getContext('user');
	import {BACKEND_URL} from '../env.js'
    import Discoverdeal from './discoverdeal.svelte';
    const page = writable()
	const carsavailabe = writable()
	carsavailabe.set({})
	const usercatalogue = writable()
	usercatalogue.set({})
	const alldealers = writable()
	alldealers.set({})
	page.set(1)
	const discover=async()=>{
      page.set(2)
	  const dealer = await fetch(`${BACKEND_URL}/alldealers`, {credentials:'include'})
	  const deal = await dealer.json()
	  alldealers.set(deal)
    }
	const available= async()=>{
      page.set(1)
	  const cars = await fetch(`${BACKEND_URL}/carsavailable`, {credentials: 'include'})
	  const record = await cars.json()
      carsavailabe.set(record)
    }
	const catalogue=()=>{
      page.set(3)
    }
	afterUpdate(async()=>{
      const response = await fetch(`${BACKEND_URL}/user/${$user.username}`, {credentials: 'include'})
      const value = await response.json()
      usercatalogue.set(value)
    })
    setContext('usercatalogue', usercatalogue)
    setContext('carsavailabe', carsavailabe)
	// Retrieve user store from context
</script>

<div class="mainpage">
<div class='sidebar'>
<section class='options' style={{borderBottom:"2px solid rgb(199, 199, 199)"}}>
<span>User Options</span>
<button on:click={available}><div>1</div>Cars Available</button>
<button on:click={discover}><div>2</div> Discover Dealership</button>
<button on:click={catalogue}><div>3</div> My Vehicles</button>
</section>
</div>
{#if $page === 1}
<Cards cars={$carsavailabe}/>
{:else if $page === 2}
<Discoverdeal cars={$alldealers}/>
    <!-- Show Component2 if page is 2 -->
{:else if $page === 3}
<Mycars cars={$usercatalogue.cars}/>
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
	margin-bottom: 1rem;
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