<script lang="ts">
	import Service from '$lib/components/Service/Service.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="space-y-4">
	{#each data.services as service}
		<Service {service} />
	{/each}
</div>
