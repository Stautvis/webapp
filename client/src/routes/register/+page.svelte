<script lang="ts">
	import Button from '../../lib/components/Button.svelte';
	import Form from '../../lib/components/Form.svelte';
	import Input from '../../lib/components/Input.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<Form method="post">
	<div class="grid grid-cols-2 space-x-4 mb-2">
		<Input
			id="firstName"
			label="Firstname"
			errors={form?.errors.firstName}
			value={form?.data?.firstName}
		/>
		<Input
			id="lastName"
			label="Lastname"
			errors={form?.errors?.lastName}
			value={form?.data?.lastName}
		/>
	</div>

	<div class="grid grid-cols-2 space-x-4 mb-2">
		<Input
			id="gender"
			label="Gender"
			errors={form?.errors?.gender}
			value={form?.data?.gender || 0}
			type="select"
		>
			<option value={0}>Male</option>
			<option value={1}>Female</option>
		</Input>

		<Input
			id="birthday"
			label="Birthday"
			type="date"
			errors={form?.errors?.birthday}
			value={form?.data?.birthday}
		/>
		<!-- <Datepicker /> -->
	</div>

	<Input
		id="emailAddress"
		label="Your email address"
		errors={form?.errors?.emailAddress}
		value={form?.data?.emailAddress || 'admin@example.com'}
	/>

	<div class="grid grid-cols-2 space-x-4 mb-2">
		<Input
			id="password"
			type="password"
			label="Enter password"
			errors={form?.errors?.password}
			value={form?.data?.password}
		/>
		<Input
			id="confirmPassword"
			type="password"
			label="Confirm password"
			errors={form?.errors?.confirmPassword}
			value={form?.data?.confirmPassword}
		/>
	</div>

	<Button>Register</Button>
</Form>
