<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Form from '$lib/components/Form.svelte';
	import Input from '$lib/components/Input.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<svelte:head>
	<title>Dashboard > Service > Add</title>
</svelte:head>

<Form method="post">
	<Input id="title" label="Service Title" errors={form?.errors?.title} value={form?.data?.title} />

	<Input
		id="description"
		label="Service Description"
		type="textarea"
		errors={form?.errors?.description}
		value={form?.data?.description}
	/>

	<Input
		id="price"
		label="Service Price"
		type="number"
		errors={form?.errors?.price}
		value={form?.data?.price}
	/>

	<div>
		<Button>Add Service</Button>
		<Button style="alternative" href="/dashboard/service">Cancel</Button>
	</div>
</Form>
