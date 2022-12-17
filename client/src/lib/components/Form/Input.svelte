<script lang="ts">
	type InputTypes = 'text' | 'password' | 'textarea' | 'number' | 'select' | 'date';
	export let type: InputTypes = 'text';
	export let id: HTMLInputElement['id'];
	export let placeholder: HTMLInputElement['placeholder'] = '';
	export let value: HTMLInputElement['value'] | number = '';
	export let size: App.Layout['size'] = 'default';
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

<div class="pb-4">
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
			class={`p-${size} base ${isErrors && !wasFocued ? 'input-error' : ''}`}
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
			step="0.01"
			class={`p-${size} base ${isErrors && !wasFocued ? 'input-error' : ''}`}
		/>
	{/if}

	{#if helper !== '' || isErrors}
		<p class={`pt-1 text-sm ${isErrors ? 'text-error' : 'text-default'}`}>
			{isErrors ? errors[0] : helper}
		</p>
	{/if}
</div>

<style>
	label {
		@apply pb-1 block text-sm font-medium;
	}
	input,
	select,
	textarea {
		@apply block w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500;
	}
	.base {
		@apply px-2 !important;
	}
	input[type='date'] {
		@apply my-auto p-1.5;
	}
	.input-error {
		@apply block w-full rounded-lg border border-red-500 bg-red-50 p-2.5 text-sm text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500;
	}
	.text-default {
		@apply text-gray-500 dark:text-gray-400;
	}
	.text-error {
		@apply text-red-600 dark:text-red-500;
	}
</style>
