<script lang="ts">
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
	import SidebarItem from '$lib/components/Sidebar/SidebarItem.svelte';
	import Header from '../../lib/components/Header/Header.svelte';
	import SelectCompany from '../../lib/components/Sidebar/SelectCompany.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css"
	/>
</svelte:head>

<Header />
<div class="flex h-full min-h-screen">
	<Sidebar>
		<SelectCompany />
		<SidebarItem title="Dashboard" href="/dashboard" icon="bi-grid-fill" />
		<SidebarItem title="Services" href="/dashboard/service" icon="bi-badge-ad-fill">
			<SidebarItem title="Approved" href="/dashboard/service?status=approved" />
			<SidebarItem title="Add service" href="/dashboard/service/add" />
		</SidebarItem>
		<SidebarItem title="Members" href="/dashboard/member" icon="bi-person-fill">
			<SidebarItem title="Add member" href="/dashboard/member/add" />
		</SidebarItem>
	</Sidebar>
	<main class="mx-auto flex-1 p-5 px-10 lg:max-w-screen-2xl">
		<slot />
	</main>
</div>
