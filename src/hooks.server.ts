import { auth } from "$lib/server/authServer"; // path to your auth file
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from '$app/environment'
 
export async function handle({ event, resolve }) {
    return svelteKitHandler({ event, resolve, auth, building });
}