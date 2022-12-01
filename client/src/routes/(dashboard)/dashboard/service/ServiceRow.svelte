<script lang="ts">
	import { goto } from "$app/navigation";
	import Button from "../../../../components/Button.svelte";

  export let id: number
  export let title : string
  export let description : string
  export let image: string
</script>

<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <td class="p-4 w-4">
        <div class="flex items-center">
            <input id="checkbox-table-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="checkbox-table-1" class="sr-only">checkbox</label>
        </div>
    </td>
    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <div class="flex items-center space-x-2">
          <div class="rounded-md overflow-hidden">
          <img src="{image}" alt="" class="object-cover object-center aspect-square w-16"/>

          </div>
          <div>
            <span class="font-semibold">{title}</span>
            <p class="text-gray-400 font-light">{description}</p>
          </div>
          
        </div>
    </th>
    <td class="py-4 px-6">
        Sliver
    </td>
    <td class="py-4 px-6">
        Laptop
    </td>
    <td class="py-4 px-6">
        $2999
    </td>
    <td class="py-4 px-6">
      <Button click={() => goto(`/dashboard/service/${id}/edit`)}>Edit</Button>
      <Button click={() => {}} icon="bi-three-dots"/>
    </td>
</tr>