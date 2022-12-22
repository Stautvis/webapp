<script lang="ts">
	let isVisible: boolean = false;
	let container: HTMLDivElement;

	const onClick = () => {
		isVisible = !isVisible;
	};

	const onWindowClick = (e: Event) => {
		if (container.contains(e.target as Node) == false) isVisible = false;
	};
</script>

<svelte:window on:click={onWindowClick} />

<div bind:this={container} class="relative inline-block">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div on:click={onClick}>
		<slot />
	</div>
	{#if isVisible}
		<slot name="dropdown" />
	{/if}
</div>
