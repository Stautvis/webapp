<script lang="ts">
	import Company from '$lib/components/Company/Company.svelte';
	import Title from '$lib/components/Title/Title.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="max-w-5xl mx-auto ">
	<Title name="Companies" />

	<div class="grid grid-cols-3">
		{#each data?.companies as company}
			<Company {company} />
		{/each}
	</div>
</div>
