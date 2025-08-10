<script lang="ts">
	import { useQuery } from 'convex-svelte';
	import { api } from '$convex/_generated/api.js';
    import Header from '$lib/ui/Header.svelte';

	const query = useQuery(api.guests.getGuests, {});
</script>

<Header />
<main class="m-8">
<h1 class="font-bold text-3xl mb-8">Svelte Cabins Admin Dashboard</h1>

{#if query.isLoading}
  <p>Loading guests...</p>
{:else if query.error}
  <p>Error loading guests: {query.error.toString()}</p>
{:else}
  <ul>
    {#each query.data as guest}
      <li>{guest.fullName} - {guest.email}</li>
    {/each}
  </ul>
{/if}
</main>