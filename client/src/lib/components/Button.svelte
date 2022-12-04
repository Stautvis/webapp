<script lang="ts">
	type ButtonStyle = 'alternative' | 'default';
	type ButtonSize = 'sm' | 'xs' | 'base';

	export let type: HTMLButtonElement['type'] | undefined = undefined;
	export let click: () => void = () => {};
	export let style: ButtonStyle = 'default';
	export let href: string = '';
	export let size: ButtonSize = 'base';
</script>

{#if href === ''}
	<button {type} on:click={click} class={`${style} ${size}`}><slot /></button>
{:else}
	<a {href} class={`${style} ${size}`}><slot /></a>
{/if}

<style>
	.alternative {
		@apply text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700;
	}

	.default {
		@apply text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg w-full sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800;
	}

	.base {
		@apply py-2.5 px-5 mr-2 mb-2 text-sm font-medium;
	}

	.sm {
		@apply py-2 px-3 text-sm font-medium text-center;
	}

	.xs {
		@apply py-2 px-3 text-xs font-medium text-center;
	}
</style>
