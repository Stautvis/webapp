<script lang="ts">
	export let href: string;
	export let title: string;
	export let icon: string;
	export let badge: string | null = null;
</script>

<!-- <a {href} class={"flex items-center p-2 text-base font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"}>
  <i class={"w-6 h-6 flex justify-center items-center justify-items-center text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white bi "+ icon}></i>
  <span class="ml-3 flex-1">{title}</span>
  
</a> -->

<li>
	<a
		{href}
		class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
	>
		<i
			class={'w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white bi ' +
				icon}
		/>

		<span class="ml-3">{title}</span>
		{#if badge !== null}
			<span
				class="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200"
				>{badge}</span
			>
		{/if}
	</a>
</li>
