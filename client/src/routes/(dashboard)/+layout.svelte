<script>
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
	import SidebarItem from '$lib/components/Sidebar/SidebarItem.svelte';
	import Header from '../../lib/components/Header/Header.svelte';
	import SelectCompany from '../../lib/components/Sidebar/SelectCompany.svelte';
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css"
	/>
</svelte:head>

<Header />
<div class="flex min-h-screen h-full">
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
	<main class="p-10 px-32 flex-1">
		<slot />
	</main>
</div>
