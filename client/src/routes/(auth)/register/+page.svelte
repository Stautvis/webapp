<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button/Button.svelte';
	import Form from '$lib/components/Form/Form.svelte';
	import Input from '$lib/components/Form/Input.svelte';
	import Title from '$lib/components/Title/Title.svelte';

	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<Title name="Sign Up">Enter required field to register new user.</Title>

<Form method="post">
	<Input
		id="firstName"
		label="First name"
		errors={form?.errors?.firstName}
		value={form?.data?.firstName}
	/>

	<Input
		id="lastName"
		label="Last name"
		errors={form?.errors?.lastName}
		value={form?.data?.lastName}
	/>

	<Input
		id="emailAddress"
		label="Email Address"
		errors={form?.errors?.emailAddress}
		value={form?.data?.emailAddress}
	/>

	<Input
		id="gender"
		label="Gender"
		errors={form?.errors?.gender}
		value={form?.data?.gender || -1}
		type="select"
	>
		<option value="-1" />
		<option value="0">Male</option>
		<option value="1">Female</option>
		<option value="2">Other</option>
	</Input>

	<Input
		id="birthday"
		label="Birthday"
		errors={form?.errors?.birthday}
		value={form?.data?.birthday}
		type="date"
	/>

	<Input
		id="password"
		label="Password"
		type="password"
		errors={form?.errors?.password}
		value={form?.data?.password}
	/>

	<div>
		<Button>Register</Button>
		<Button href={$page.url.searchParams.get('redirect') || '/'} style="alternative">Cancel</Button>
	</div>
</Form>
