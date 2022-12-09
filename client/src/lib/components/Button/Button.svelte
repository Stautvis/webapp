<script lang="ts">
	import type { ButtonStyle } from './Button';

	export let type: HTMLButtonElement['type'] | undefined = undefined;
	export let click: () => void = () => {};
	export let style: ButtonStyle = 'default';
	export let href: string = '';
	export let size: App.Layout['size'] = 'base';
</script>

{#if href === ''}
	<button {type} on:click={click} class={`${style} p-${size}`}><slot /></button>
{:else}
	<a {href} class={`${style} p-${size}`}><slot /></a>
{/if}

<style>
	button,
	a {
		@apply inline-flex select-none items-center justify-center rounded-lg border text-center font-medium focus:z-10 focus:outline-none focus:ring-4 sm:w-auto;
	}

	.alternative {
		@apply border-gray-200 bg-white hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700;
	}

	.default {
		@apply border-blue-700 bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800;
	}
</style>
