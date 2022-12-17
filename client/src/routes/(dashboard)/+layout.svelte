<script lang="ts">
	import SelectCompany from '$lib/components/Sidebar/SelectCompany.svelte';
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
	import SidebarItem from '$lib/components/Sidebar/SidebarItem.svelte';
</script>

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
	<main class="p-5 px-10 lg:max-w-screen-2xl flex-1 mx-auto">
		<slot />
	</main>
</div>
