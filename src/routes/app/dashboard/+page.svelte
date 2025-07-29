<script lang="ts">
    import { useQuery } from 'convex-svelte';
	import { api } from '$convex/_generated/api.js';

	import Header from "$lib/ui/Header.svelte";

	const query = useQuery(api.bookings.getBookings, {});

</script>

<Header />
<main class="m-8">
<h1 class="font-bold text-3xl mb-8">Svelte Cabins App Dashboard</h1>

<div>
    <div>Bookings</div>

    {#if query.isLoading}
      <p>Loading bookings...</p>
    {:else if query.error}
      <p>Error loading bookings: {query.error.toString()}</p>
    {:else}
      <ul>
        {#each query.data as booking}
        <li>
            <div>
            Cabin Id: {booking.cabinId} / Guest Id: {booking.guestId} / ResDate: {booking.created_at.daysFrom} - withTime: {booking.created_at.withTime} / startFromToday: {booking.startDate.daysFrom} / endFromToday: {booking.endDate.daysFrom} / Number of guests: {booking.numGuest} / Requested breakfast: {booking.hasBreakfast ? 'Yes' : 'No'} / Paid: { booking.isPaid ? 'Yes' : 'No'}
            </div>
            <div>
                Special notes: {booking.observations ? booking.observations : 'No notes provided'}       </div>
            </li>
        {/each}
      </ul>
    {/if}
</div>

</main>