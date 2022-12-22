<script lang="ts">
	export let title: string;
	export let description: string = '';
	export let visible: boolean = false;

	const onClick = () => (visible = !visible);
</script>

<div
	id="accordion-flush"
	data-accordion="collapse"
	data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
	data-inactive-classes="text-gray-500 dark:text-gray-400"
>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<h2 id="accordion-flush-heading-1" class="border-b border-gray-500 py-2" on:click={onClick}>
		<button
			type="button"
			class="text-lg w-full font-bold dark:text-white flex justify-between flex-1 select-none"
		>
			<span>{title}</span>
			<div>
				<svg
					data-accordion-icon
					class="w-6 h-6 rotate-180 shrink-0"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/></svg
				>
			</div>
		</button>
		<p class="text-base font-normal text-gray-500 select-none">
			{description}
		</p>
	</h2>
	{#if visible}
		<div id="accordion-flush-body-1" aria-labelledby="accordion-flush-heading-1">
			<div class="max-w-2xl py-4">
				<slot />
			</div>
		</div>
	{/if}
</div>
