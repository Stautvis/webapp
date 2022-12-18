<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import Form from '$lib/components/Form/Form.svelte';
	import Input from '$lib/components/Form/Input.svelte';
	import type { ActionData, PageData } from './$types';

	export let form: ActionData;
	export let data: PageData;
</script>

<Form>
	<Input
		id="title"
		label="Service title"
		value={form?.data?.title || data.title}
		errors={form?.errors?.title}
	/>

	<Input
		id="shortDescription"
		label="Service short description"
		type="textarea"
		value={form?.data?.shortDescription || data.shortDescription}
		errors={form?.errors?.shortDescription}
	/>

	<Input
		id="description"
		label="Service description"
		type="textarea"
		value={form?.data?.description || data.description}
		errors={form?.errors?.description}
	/>

	<Input
		id="image"
		label="Service image"
		value={form?.data?.image || data.image}
		errors={form?.errors?.image}
	/>

	<div>
		<Button>Edit service</Button>
		<Button style="alternative" href="/dashboard/service">Cancel</Button>
	</div>
</Form>
