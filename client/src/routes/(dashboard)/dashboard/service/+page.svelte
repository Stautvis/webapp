<script lang="ts">
	import ServiceListItem from '$lib/components/Service/ServiceListItem.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Dashboard > Service</title>
</svelte:head>
/dashboard/service

{#each data.services as item}
	<ServiceListItem {item} />
{/each}
