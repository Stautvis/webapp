<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import Form from '$lib/components/Form/Form.svelte';
	import Input from '$lib/components/Form/Input.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<Form>
	<Input id="title" label="Service title" value={form?.data?.title} errors={form?.errors?.title} />

	<div>
		<Button>Create service</Button>
		<Button style="alternative" href="/dashboard/service">Cancel</Button>
	</div>
</Form>
