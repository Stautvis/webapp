<script lang="ts">
	import Button from './Button.svelte';

	export let icon: string;
	// export let;
	// export let props: ComponentProps<Button>;
</script>

<Button {...$$props}>
	<i class="bi {icon}" />
	<slot />
</Button>
