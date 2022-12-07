<script lang="ts">
	import Button from '../Button/Button.svelte';

	export let item: App.IService;
	const { id, title } = item;
</script>

<div class="bg-gray-800 flex-1 my-2 rounded-lg p-3 flex flex-row items-center space-x-3">
	<div class="bg-red-100 basis-24 rounded-lg overflow-hidden">
		<img
			src="https://images.pexels.com/photos/344034/pexels-photo-344034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
			alt="Service"
			class="object-cover object-center aspect-square"
		/>
	</div>
	<div class="flex-1">
		<span>{title}</span>
	</div>

	<div class="space-x-2 flex">
		<Button style="alternative" size="xs" href={`/dashboard/service/${id}/edit`}>Edit</Button>
		<Button style="alternative" dropdown size="xs">
			<span slot="title"><i class="bi bi-three-dots" /></span>
		</Button>
	</div>
</div>
