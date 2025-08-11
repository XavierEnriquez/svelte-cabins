import { betterAuth } from "better-auth";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";
 
export const auth = betterAuth({
  // ... your config
  emailAndPassword: { 
    enabled: true, 
  }, 
  plugins: [sveltekitCookies(getRequestEvent)]
});