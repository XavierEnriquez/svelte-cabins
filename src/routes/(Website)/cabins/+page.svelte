<script lang="ts">
	import { useQuery } from 'convex-svelte';
	import { api } from '$convex/_generated/api.js';

	const query = useQuery(api.cabins.getCabins, {});
</script>

<main class="m-8">
<h1 class="font-bold text-3xl mb-8">Explore Our Luxury Cabins</h1>
<p class="text-primary-200 text-lg mb-10 max-w-3xl">
        Luxurious yet cozy cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <div>Filter Component</div>
      <div>
          <div>Cabins List Component</div>
          {#if query.isLoading}
  <p>Loading cabins...</p>
{:else if query.error}
  <p>Error loading cabins: {query.error.toString()}</p>
{:else}
  <ul>
    {#each query.data as cabin}
      <li>{cabin.name} - {cabin.description}</li>
    {/each}
  </ul>
{/if}
          <div>Reservation Reminder Component</div>
      </div>
</main>