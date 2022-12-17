<script lang="ts">
	import Button from '../Button/Button.svelte';
	import IconButton from '../Button/IconButton.svelte';

	export let item: App.IService;
	const { id, title } = item;
</script>

<div class="mb-4 flex flex-1 flex-row items-center space-x-3 rounded-lg bg-gray-800 p-3">
	<div class="basis-24 overflow-hidden rounded-lg bg-red-100">
		<img
			src="https://images.pexels.com/photos/344034/pexels-photo-344034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
			alt="Service"
			class="aspect-square object-cover object-center"
		/>
	</div>
	<div class="flex-1">
		<span>{title}</span>
	</div>

	<div class="flex space-x-2">
		<Button style="alternative" size="xs" href={`/dashboard/service/${id}/edit`}>Edit</Button>
		<!-- <Button style="alternative" dropdown size="xs">
			<span slot="title"><i class="bi bi-three-dots" /></span>
		</Button> -->

		<IconButton icon="bi-three-dots" size="sm" style="alternative" />
	</div>
</div>
