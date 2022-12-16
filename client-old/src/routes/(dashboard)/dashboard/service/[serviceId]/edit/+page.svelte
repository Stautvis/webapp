<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button/Button.svelte';
	import Form from '$lib/components/Form.svelte';
	import Input from '$lib/components/Input.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<svelte:head>
	<title>Dashboard > Service {$page.params.serviceId} > Edit</title>
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
