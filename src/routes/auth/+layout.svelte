<script lang="ts">
	import Header from '$lib/ui/Header.svelte';

let { children } = $props();
</script>

<Header />
<div class="container">
  {@render children()}
</div>
