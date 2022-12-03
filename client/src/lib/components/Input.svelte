<script lang="ts">
	type InputTypes = 'text' | 'password' | 'textarea' | 'number' | 'select' | 'date';

	export let type: InputTypes = 'text';
	export let id: HTMLInputElement['id'];
	export let placeholder: HTMLInputElement['placeholder'] = '';
	export let value: HTMLInputElement['value'] | number = '';
	export let label: string = '';
	export let helper: string = '';
	export let errors: string[] = [];

	let wasFocued: boolean = false;

	const onFocus = () => (wasFocued = true);

	const getType = () => {
		if (type == 'textarea') return type;
		if (type == 'select') return type;
		return 'input';
	};

	$: isErrors = errors.length !== 0;
</script>

<div class="mb-2">
	{#if label !== ''}
		<label for={id}>{label}</label>
	{/if}

	{#if type === 'select'}
		<svelte:element
			this={getType()}
			{type}
			{id}
			{placeholder}
			{value}
			name={id}
			on:focus={onFocus}
			class={isErrors && !wasFocued ? 'input-error' : ''}
		>
			<slot />
		</svelte:element>
	{:else}
		<svelte:element
			this={getType()}
			{type}
			{id}
			{placeholder}
			{value}
			name={id}
			on:focus={onFocus}
			class={isErrors && !wasFocued ? 'input-error' : ''}
		/>
	{/if}

	{#if helper !== '' || isErrors}
		<p class={`mt-2 text-sm ${isErrors ? 'text-error' : 'text-default'}`}>
			{isErrors ? errors[0] : helper}
		</p>
	{/if}
</div>

<style>
	label {
		@apply block mb-2 text-sm font-medium text-gray-900 dark:text-white;
	}

	input,
	select {
		@apply appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500;
	}

	input[type='date'] {
		@apply p-1.5 my-auto;
	}

	.input-error {
		@apply bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500;
	}

	.text-default {
		@apply text-gray-500 dark:text-gray-400;
	}

	.text-error {
		@apply text-red-600 dark:text-red-500;
	}
</style>
