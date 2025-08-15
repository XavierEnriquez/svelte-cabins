<script lang="ts">
  import '../app.css';
  import { PUBLIC_CONVEX_URL } from '$env/static/public';
  import { setupConvex } from 'convex-svelte';
  import { onMount } from 'svelte';
  import { authClient } from '$lib/auth-client';

  let { children } = $props();

  // Setup Convex for SvelteKit
  setupConvex(PUBLIC_CONVEX_URL);

  // Initialize auth client on mount
  onMount(() => {
    // Any client-side auth initialization can go here
  });
</script>

{@render children()}
