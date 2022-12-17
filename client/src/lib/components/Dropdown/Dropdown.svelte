<script lang="ts">
	let isVisible: boolean = false;

	const onClick = () => {
		isVisible = !isVisible;
	};
</script>

<div class="relative">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div on:click={onClick}>
		<slot />
	</div>
	{#if isVisible}
		<slot name="dropdown" />
	{/if}
</div>
