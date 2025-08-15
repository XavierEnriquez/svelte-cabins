// hooks.server.ts
import type { Handle } from "@sveltejs/kit";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";
import { redirect } from '@sveltejs/kit';
import { createAuth } from "$convex/auth";
import {  svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/environment";

const auth = createAuth();

export const handle: Handle = async ({ event, resolve }) => {
  // With the official Convex integration, authentication is handled
  // entirely through Convex, so no special server handling is needed

  sveltekitCookies(getRequestEvent);

  const fetchedSession = await auth.api.getSession(
    {
      headers: event.request.headers,
    //     query: {
    //     disableCookieCache: true,
    // }, 
}
);
const session = fetchedSession?.session;
const user = fetchedSession?.user;

 if (session) {
        event.locals.user = user;
        event.locals.session = session ? {
            user: session.userId,
            sessionId: session.id,
            expiresAt: session.expiresAt,
            token: session.token,
        } : null;
    } else {
        delete event.locals.user;
        delete event.locals.session;
    }

  if (event.url.pathname.startsWith('/(app)/') || event.route.id?.startsWith('/(app)/')) {
       if (!event.locals?.user || !event.locals?.session) {
        throw redirect(302, '/api/auth/login');
       }
   }

  // When opening the inspect window in browser, chrome-devtools makes two calls to
	// Devtools Project Setting and Automatic Workspace Folders, constantly creating a pesky error
	// during development. This if() statement takes care of it. Remove if want chrome-devtools in production.
	if (event.url.pathname.startsWith('/.well-known/appspecific/com.chrome.devtools')) {
		return new Response(null, { status: 204 }); // Return empty response with 204 No Content
	}

  return svelteKitHandler({ event, resolve, auth, building });
};

