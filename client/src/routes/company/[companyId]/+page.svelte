<script lang="ts">
	import Title from '$lib/components/Title/Title.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="max-w-2xl mx-auto">
	<Title name={data.company?.title || ''} />
</div>
