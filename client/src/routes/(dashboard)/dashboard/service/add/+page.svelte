<script lang="ts">
	import Input from "../../../../../components/Input.svelte";
    /** @type {import('./$types').PageData} */
  export let data : {token: string};

  console.log(data)

  let title : string = ""
  let description : string = ""

</script>

{data.token}
<form action="/dashboard/service/add" method="post">
  <Input id="title" bind:value={title} label="Service Title" />
  <Input id="description" bind:value={description} type="textarea" label="Service Description" />
  <Input id="submit" type="submit" value="Add service"/>
</form>