<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import Dropdown from '$lib/components/Dropdown/Dropdown.svelte';
	import DropdownMenu from '$lib/components/Dropdown/DropdownMenu.svelte';

	export let service: App.IService;
	const { company, id, title, description, image, shortDescription } = service;
</script>

<div class="flex bg-gray-800 p-4 rounded-lg justify-between items-center space-x-4">
	<div class="basis-1/6 rounded-lg overflow-hidden aspect-video">
		<img src={image} alt="service" class="w-full h-full object-cover object-center" />
	</div>
	<div class="flex flex-1 flex-col self-stretch">
		<span class="font-semibold">{title}</span>
		<div class="text-gray-400">{shortDescription}</div>
	</div>
	<div class="flex space-x-1">
		<Button size="xs" href={`/dashboard/service/${id}/edit`}>Edit</Button>
		<Dropdown>
			<Button style="alternative" size="xs" icon="bi-three-dots" />
			<DropdownMenu slot="dropdown">
				<div>
					<Button style="dropdown" href={`/dashboard/service/${id}`}>View</Button>
				</div>
				<div>
					<Button style="dropdown" href={`/dashboard/service/${id}/delete`}>Delete</Button>
				</div>
			</DropdownMenu>
		</Dropdown>
	</div>
</div>
