<script lang="ts">
	import Button from "../../../lib/components/Button.svelte";
	import Form from "../../../lib/components/Form.svelte";
	import Input from "../../../lib/components/Input.svelte";
	import type { ActionData } from "./$types";

	export let form: ActionData;
</script>

<Form method="post">
  <Input
    id="title"
    label="Company title"
    errors={form?.errors?.title}
    value={form?.data?.title}
  />

  <Input
    id="description"
    label="Company description"
    type="textarea"
    errors={form?.errors?.description}
    value={form?.data?.description}
  />

	<Button>Add</Button>
</Form>
