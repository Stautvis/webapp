<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

{data.user?.id}
<slot />
