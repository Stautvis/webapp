<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import Form from '$lib/components/Form/Form.svelte';
	import Input from '$lib/components/Form/Input.svelte';
	import Title from '$lib/components/Title/Title.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<Title name="Add new service" />

<Form>
	<Input id="title" label="Service title" value={form?.data?.title} errors={form?.errors?.title} />

	<Input
		id="shortDescription"
		label="Service short description"
		type="textarea"
		value={form?.data?.shortDescription}
		errors={form?.errors?.shortDescription}
	/>

	<Input
		id="description"
		label="Service description"
		type="textarea"
		value={form?.data?.description}
		errors={form?.errors?.description}
	/>

	<Input id="image" label="Service image" value={form?.data?.image} errors={form?.errors?.image} />

	<div>
		<Button>Create service</Button>
		<Button style="alternative" href="/dashboard/service">Cancel</Button>
	</div>
</Form>
