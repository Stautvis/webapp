<script lang="ts">
	import Header from "../../../../components/Header.svelte";
	import ServiceTable from "./ServiceTable.svelte";
	
	
	/** @type {import('./$types').PageData} */
  export let data : {services: App.IService[]};

</script>

<Header title="Services"/>

<div>
	<a href="/dashboard/service/add" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
		<i class="bi bi-plus-square pr-2"></i>
		Add service
	</a>	
</div>

<ServiceTable services={data.services}/>
