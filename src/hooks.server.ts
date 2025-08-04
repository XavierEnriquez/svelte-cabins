import { auth } from "$lib/server/auth"; // path to your auth file
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from '$app/environment'
import { json } from '@sveltejs/kit';
 
export async function handle({ event, resolve }) {

    const fetchedSession = await auth.api.getSession({
        headers: event.request.headers
    })

    if (fetchedSession) {
        const {user, session} = fetchedSession;
        event.locals.user = user;
        event.locals.session = session;

    } else {
        delete event.locals.user;
        delete event.locals.session;
    }

   if (event.url.pathname.startsWith('/app') || event.route.id?.startsWith('/app')) {
if (event.locals?.user?.role !== 'admin') {
            return json({ message:'Unauthorized'}, { status: 401 });
        }}

        // When opening the inspect window in browser, chrome-devtools makes two calls to
	// Devtools Project Setting and Automatic Workspace Folders, constantly creating a pesky error
	// during development. This if() statement takes care of it. Remove if want chrome-devtools in production.
	if (event.url.pathname.startsWith('/.well-known/appspecific/com.chrome.devtools')) {
		return new Response(null, { status: 204 }); // Return empty response with 204 No Content
	}

    return svelteKitHandler({ event, resolve, auth, building });
}