<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import Form from '$lib/components/Form.svelte';
	import Input from '$lib/components/Input.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<Form method="post">
	<Input
		id="emailAddress"
		label="Your email address"
		errors={form?.errors?.emailAddress}
		value={form?.data?.emailAddress || 'admin@example.com'}
	/>
	<Input
		id="password"
		type="password"
		label="Your password"
		errors={form?.errors?.password}
		value={form?.data?.password || 'password'}
	/>

	<Button>Login</Button>
</Form>
