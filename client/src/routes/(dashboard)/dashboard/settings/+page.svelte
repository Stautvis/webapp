<script lang="ts">
	import Accordation from '$lib/components/Accordation/Accordation.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import Form from '$lib/components/Form/Form.svelte';
	import Input from '$lib/components/Form/Input.svelte';
	import Title from '$lib/components/Title/Title.svelte';
	import type { ActionData, PageData } from './$types';

	export let form: ActionData;
	export let data: PageData;
</script>

<Title name="Settings" />

<Accordation
	visible={form?.open || false}
	title="General information"
	description="Update general company information, such as title, short description, description"
>
	<Form>
		<div class="grid grid-cols-2 md:grid-cols-6  gap-x-4">
			<div class="col-span-4">
				<Input
					id="title"
					size="sm"
					label="Company title"
					value={form?.data?.title || data.company?.title}
					errors={form?.errors.title}
				/>
			</div>
			<div class="col-span-2">
				<Input
					id="id"
					size="sm"
					disabled
					label="Company ID"
					value={form?.data?.id || data.company?.id}
				/>
			</div>
		</div>

		<Input
			id="shortDescription"
			label="Company short description"
			type="textarea"
			size="sm"
			value={form?.data?.shortDescription || data.company?.shortDescription}
			errors={form?.errors.shortDescription}
		/>

		<Input
			id="description"
			label="Company description"
			type="textarea"
			size="sm"
			value={form?.data?.description || data.company?.description}
			errors={form?.errors.description}
		/>

		<Input
			id="image"
			label="Company image"
			value={form?.data?.image || data.company?.image}
			errors={form?.errors.image}
		/>

		<Button size="xs">Save changes</Button>
	</Form>
</Accordation>

<Accordation title="Advanced" description="Delete your company, trasfer ownership.">
	<span class="block">This action cannot be undone! All created services will be deleted!</span>
	<Button size="xs" href="/dashboard/settings/delete">Delete company</Button>
</Accordation>
