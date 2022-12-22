<script lang="ts">
	import SelectCompany from '$lib/components/Sidebar/SelectCompany.svelte';
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
	import SidebarItem from '$lib/components/Sidebar/SidebarItem.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div class="flex min-h-screen h-full">
	<Sidebar>
		<div class="flex flex-1 flex-col">
			<SelectCompany company={data.company} />
			<SidebarItem title="Dashboard" href="/dashboard" icon="bi-grid-fill" />
			<SidebarItem title="Services" href="/dashboard/service" icon="bi-badge-ad-fill">
				<SidebarItem title="Approved" href="/dashboard/service?status=approved" />
				<SidebarItem title="Add service" href="/dashboard/service/add" />
			</SidebarItem>
			<SidebarItem title="Members" href="#" icon="bi-person-fill">
				<SidebarItem title="Add member" href="#" />
			</SidebarItem>
		</div>
		<div>
			<SidebarItem title="Settings" icon="bi-gear-fill" href="/dashboard/settings" />
		</div>
	</Sidebar>
	<main class="p-5 px-10 lg:max-w-screen-2xl flex-1 mx-auto">
		<slot />
	</main>
</div>
