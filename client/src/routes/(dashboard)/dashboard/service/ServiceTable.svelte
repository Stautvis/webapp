<script lang="ts">
	import ServiceRow from "./ServiceRow.svelte";


  export let services : App.IService[];
</script>

<header>
  
</header>

<table class="w-full text-sm  text-left text-gray-500 dark:text-gray-400 hover:border-spacing-5">
    <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
        <tr>
            <th scope="col">
                <div class="flex items-center">
                    <input id="checkbox-all" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="checkbox-all" class="sr-only">checkbox</label>
                </div>
            </th>
            <th scope="col">
                Service details
            </th>
            <th scope="col">
                Category
            </th>
            <th scope="col">
                Price
            </th>
            <th scope="col">
                Rating
            </th>
            <th scope="col">
                Action
            </th>
        </tr>
    </thead>
    <tbody>
      {#each services as service (service.id) }
        <ServiceRow {...service}/>
      {/each}  
    </tbody>
</table>

<style>
  thead > tr > th {
    @apply py-4 px-6 font-medium;
  }
</style>