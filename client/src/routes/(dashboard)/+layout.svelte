<script>
	import Breadcrumb from "../../components/Breadcrumb.svelte";
	import Sidebar from "../../components/Sidebar/Sidebar.svelte";
	import SidebarItem from "../../components/Sidebar/SidebarItem.svelte";
	import Topbar from "../../components/Topbar/Topbar.svelte";

</script>

<div class="flex min-h-screen h-full flex-1">
  <div>
    <Sidebar>
      <SidebarItem href="/dashboard" title="Dashboard" icon="bi-grid-fill"/>
      <SidebarItem href="/dashboard/service" title="Services" icon="bi-badge-ad-fill"/>
      <SidebarItem href="/dashboard/members" title="Members" icon="bi-people-fill"/>
      <SidebarItem href="/dashboard/settings" title="Settings" icon="bi-gear-fill"/>
    </Sidebar>  
  </div>
  <div class="flex flex-col flex-1 px-10 rounded-lg bg-gray-100 dark:bg-gray-900">
    <Topbar/>
    <Breadcrumb/>
    <slot/>
  </div >

</div>
