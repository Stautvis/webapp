<script lang="ts">
	type ButtonStyle = 'alternative' | 'default';

	export let type: HTMLButtonElement['type'] | undefined = undefined;
	export let click: () => void = () => {};
	export let style: ButtonStyle = 'default';
	export let href: string = '';
</script>

{#if href === ''}
	<button {type} on:click={click} class={`${style}`}><slot /></button>
{:else}
	<a {href} class={`${style}`}><slot /></a>
{/if}

<style>
	.alternative {
		@apply py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700;
	}

	.default {
		@apply text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800;
	}
</style>
