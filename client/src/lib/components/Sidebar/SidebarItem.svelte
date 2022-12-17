<script lang="ts">
	export let title: string;
	export let href: string;
	export let icon: string = '';

	let active: boolean = false;

	const toggle = () => (active = !active);
</script>

<div
	class="flex items-center p-2 px-3 justify-between text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
>
	<a {href} class="flex flex-1" class:active-title={active}>
		{#if icon !== ''}
			<i class={'' + icon} />
		{/if}
		<span class="ml-3">{title}</span>
	</a>
	{#if $$slots.default}
		<button on:click={toggle} class="hover:bg-gray-600 rounded-lg px-1">
			<i class={active ? 'bi bi-chevron-up' : 'bi bi-chevron-down'} />
		</button>
	{/if}
</div>
{#if active && $$slots.default}
	<ul id="dropdown-example" class="space-y pl-3">
		<slot>
			<div class="hidden">Hidden</div>
		</slot>
	</ul>
{/if}

<style>
	.active {
		@apply hidden;
	}
	.active-title {
		@apply font-semibold;
	}
	.sub-menu {
		@apply text-gray-500;
	}
</style>
