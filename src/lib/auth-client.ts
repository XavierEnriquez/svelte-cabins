// src/lib/auth-client.ts
import { browser } from "$app/environment";
import { convexClient } from "@convex-dev/better-auth/client/plugins";
import { createAuthClient } from "better-auth/svelte"; // Use svelte instead of react
// import { browser } from '$app/environment';

export const authClient = createAuthClient({
  // baseURL: browser ? window.location.origin : "http://localhost:5173/",
  // baseURL: "http://localhost:5173/api/auth",
  // baseURL: import.meta.env.VITE_BETTER_AUTH_URL || "http://localhost:5171",
  baseURL: browser ? window.location.origin : 'http://127.0.0.1:5173',
  // Note: The Convex Better Auth plugins might not work directly with Svelte
  // You may need to handle auth differently in SvelteKit
  plugins: [convexClient(),]
});

// Extract reactive stores
export const { signIn, signUp, signOut, useSession } = authClient;