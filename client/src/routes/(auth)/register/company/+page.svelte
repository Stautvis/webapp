<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import Form from '$lib/components/Form/Form.svelte';
	import Input from '$lib/components/Form/Input.svelte';
	import Title from '$lib/components/Title/Title.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<Title name="Create new company" />

<Form>
	<Input
		id="title"
		size="sm"
		label="Company title"
		value={form?.data?.title}
		errors={form?.errors.title}
	/>

	<Input
		id="shortDescription"
		label="Company short description"
		type="textarea"
		size="sm"
		value={form?.data?.shortDescription}
		errors={form?.errors.shortDescription}
	/>

	<Input
		id="description"
		label="Company description"
		type="textarea"
		size="sm"
		value={form?.data?.description}
		errors={form?.errors.description}
	/>

	<Input id="image" label="Company image" value={form?.data?.image} errors={form?.errors.image} />

	<Button size="xs">Save changes</Button>
</Form>
