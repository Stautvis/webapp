<script lang="ts">
  type ButtonSize = "sm" | "md" | "lg"

  export let click : () => void;
  export let icon : string | null = null
  // export let size : ButtonSize
</script>


<button on:click={click} type="button" class="px-4 py-2 text-sm font-bold bg-gray-100 rounded-lg hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
  {#if icon !== null}
  <i class={"bi "+ icon}></i>
  {/if}
  <slot/>
</button>