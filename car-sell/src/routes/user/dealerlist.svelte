<script>
    export let car;
   
   </script>
   
   <div class="item">
   <div class="card min-w-64 mx-auto gap-2 flex flex-col bg-purple-400 p-8 rounded-2xl mt-12">
           <h1 class="font-bold text-6xl">{car?.username}</h1>
           <h2 class="font-bold text-6xl">{car?.cars.length}</h2>
           <p class="font-bold text-6xl text-slate-600">{car?.cars.length}</p>
           <button class="bg-red-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Visit</button>
       </div>
   </div>
   
   <style>
   
   </style>
   
   