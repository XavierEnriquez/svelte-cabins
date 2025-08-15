// hooks.server.ts
import type { Handle } from "@sveltejs/kit";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";
// import { building } from '$app/environment'
// import { svelteKitHandler } from "better-auth/svelte-kit";
// import { createAuth } from "$convex/auth";
// import { authClient } from "$lib/auth-client";

// const auth = createAuth();
// const auth = authClient;
export const handle: Handle = async ({ event, resolve }) => {
  // With the official Convex integration, authentication is handled
  // entirely through Convex, so no special server handling is needed
  sveltekitCookies(getRequestEvent);
  // Fetch current session from Better Auth
//   const session = await auth.getSession(
//     {
//         query: {
//         disableCookieCache: true,
//     }, 
// });

  // Make session and user available on server
  // if (session) {
  //   event.locals.session = session ? {
  //   user: session?.user,
  //   sessionId: session?.session.id,
  //   expiresAt: session?.session.expiresAt,
  //   token: session?.session.token,
  // } : null;
  // event.locals.user = session?.user || null;
  // }

  return resolve(event);
};

// export const handle: Handle = async ({ event, resolve }) => {
//   // With the official Convex integration, authentication is handled
//   // entirely through Convex, so no special server handling is needed
//   sveltekitCookies(getRequestEvent);
//   // Fetch current session from Better Auth
//   const session = await auth.api.getSession(
//     {
//         query: {
//         disableCookieCache: true,
//     }, 
//     headers: event.request.headers
// });

//   // Make session and user available on server
//   if (session) {
//     event.locals.session = session ? {
//     user: session?.user,
//     sessionId: session?.session.id,
//     expiresAt: session?.session.expiresAt,
//     token: session?.session.token,
//   } : null;
//   event.locals.user = session?.user || null;
//   }

//   return svelteKitHandler({ event, resolve, auth, building });
// };