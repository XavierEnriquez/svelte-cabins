// src/lib/auth-client.ts
import { createAuthClient } from "better-auth/svelte"; // Use svelte instead of react
import { browser } from '$app/environment';

export const authClient = createAuthClient({
  baseURL: browser ? window.location.origin : 'http://localhost:5173',
  // Note: The Convex Better Auth plugins might not work directly with Svelte
  // You may need to handle auth differently in SvelteKit
});

// Extract reactive stores
export const { signIn, signUp, signOut, useSession } = authClient;