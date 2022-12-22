<script lang="ts">
	import Header from '$lib/components/Header/Header.svelte';
	import '../app.css';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
	console.log(data.user);
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css"
	/>
</svelte:head>

<div class="min-h-screen">
	<Header user={data.user} />
	<slot />
</div>
