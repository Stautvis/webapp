<script lang="ts">
	import Service from '$lib/components/Service/Service.svelte';
	import Title from '$lib/components/Title/Title.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Title name="Services" />

<div class="space-y-4">
	{#each data.services as service}
		<Service {service} />
	{/each}
</div>
