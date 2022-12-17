<script lang="ts">
	import Header from '$lib/components/Header/Header.svelte';
	import '../app.css';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

<Header user={data.user} />
<slot />
