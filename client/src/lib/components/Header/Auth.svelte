<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button/Button.svelte';
	export let user: App.IUser | undefined;
	$: user = user;
</script>

{#if user !== undefined}
	<button
		type="button"
		class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
		id="user-menu-button"
		aria-expanded="false"
		data-dropdown-toggle="dropdown"
	>
		<span class="sr-only">Open user menu</span>
		<img
			class="w-8 h-8 rounded-full"
			src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
			alt="user"
		/>
	</button>
	<Button href="/logout">Logout</Button>
{:else}
	<Button style="link" href={`/login?redirect=${$page.url.pathname}`}>Sign In</Button>
	<Button href={`/register?redirect=${$page.url.pathname}`}>Sign Up</Button>
{/if}
