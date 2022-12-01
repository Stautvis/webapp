<script lang="ts">
	

  export let type : HTMLInputElement["type"] = "text"
  export let placeholder: HTMLInputElement["placeholder"] = ""
  export let label : HTMLLabelElement["textContent"] = null
  export let value : HTMLInputElement["value"]
  export let id : HTMLInputElement["id"]


  function typeAction(node : HTMLInputElement) {
    node.type = type;
  }
</script>

<div class="input-group">
  {#if label !== null}
    <label for={id} >{label}</label>
  {/if}
  {#if type === "textarea"}
    <textarea {id} bind:value={value} {placeholder} name={id}></textarea>
  {:else}
      <input use:typeAction {id} bind:value={value} {placeholder} name={id}>
  {/if}
</div>


<style>
  input, textarea {
    @apply border border-black;
  }
  label {
    @apply text-black;
  }

  .input-group {
    @apply flex flex-col;
  }
</style>