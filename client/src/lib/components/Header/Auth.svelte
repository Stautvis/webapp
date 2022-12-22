<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button/Button.svelte';
	import Dropdown from '$lib/components/Dropdown/Dropdown.svelte';
	import DropdownMenu from '$lib/components/Dropdown/DropdownMenu.svelte';
	import { UserRoles } from '$lib/enums/UserRoles';
	export let user: App.IUser | undefined;
</script>

{#if user !== undefined}
	<Dropdown>
		<button
			type="button"
			class="flex mx-3 text-sm bg-gray-800 rounded-lg md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
			id="user-menu-button"
			aria-expanded="false"
			data-dropdown-toggle="dropdown"
		>
			<span class="sr-only">Open user menu</span>
			<img
				class="w-8 h-8 rounded-lg"
				src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
				alt="user"
			/>
		</button>
		<DropdownMenu slot="dropdown">
			<Button href="/profile" style="dropdown">
				<div class="text-xs inline-flex flex-row space-x-2 items-center">
					<div class="flex-shrink-0">
						<img
							class="w-8 h-8 rounded-lg object-cover"
							src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
							alt="user"
						/>
					</div>
					<div class="block text-start w-full overflow-hidden">
						<div class="block truncate">{user.firstName} {user.lastName}</div>
						<div class="font-medium truncate">{user.emailAddress}</div>
					</div>
				</div>
			</Button>
			<div>
				{#if user.roles.includes(UserRoles.ADMIN) || user.roles.includes(UserRoles.OWNER)}
					<Button style="dropdown" href="/dashboard">Dashboard</Button>
				{/if}
				{#if user.companyID == 0}
					<Button style="dropdown" href="/register/company">Create company</Button>
				{/if}
				<Button style="dropdown" href="/settings">Settings</Button>
			</div>
			<div>
				<Button style="dropdown" href="/logout">Sign out</Button>
			</div>
		</DropdownMenu>
	</Dropdown>
{:else}
	<Button style="link" href={`/login?redirect=${$page.url.pathname}`}>Sign In</Button>
	<Button href={`/register?redirect=${$page.url.pathname}`}>Sign Up</Button>
{/if}
