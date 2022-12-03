<script>
	import Button from '../../lib/components/Button.svelte';
	/** @type {import('./$types').ActionData} */
	export let form;

	console.log(form);

	import Form from '../../lib/components/Form.svelte';
	import Input from '../../lib/components/Input.svelte';
</script>

<Form method="post">
	<Input
		id="emailAddress"
		label="Your email address"
		helper="This is helper"
		errors={form?.errors?.emailAddress}
		value={form?.data?.emailAddress}
	/>
	<Input
		id="password"
		label="Your password"
		errors={form?.errors?.password}
		value={form?.data?.password}
	/>

	<Button>Login</Button>
</Form>
