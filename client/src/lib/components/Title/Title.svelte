<script lang="ts">
	export let name: string;
</script>

<div class="py-4">
	<h2>{name}</h2>
	<p class="text-gray-500"><slot /></p>
</div>
