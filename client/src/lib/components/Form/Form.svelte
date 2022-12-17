<script lang="ts">
	type FormActions = 'post' | 'get';
	export let method: FormActions = 'post';
	export let action: HTMLFormElement['action'] = '';
</script>

<form {action} {method}>
	<slot />
</form>
