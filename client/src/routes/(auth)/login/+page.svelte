<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import Form from '$lib/components/Form/Form.svelte';
	import Input from '$lib/components/Form/Input.svelte';
	import Title from '$lib/components/Title/Title.svelte';

	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<Title name="Sign In">Enter your email and password to login to your account.</Title>

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
