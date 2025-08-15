import type { Actions, PageServerLoad } from "./$types";
import { authClient } from "$lib/auth-client";
import { fail, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
	const user = await event.locals.user;
	return { user };
};

export const actions: Actions = {
  signin: async ({ request  }) => {
    const data = await request.formData();
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    const result = await authClient.signIn.email({
      email,
      password,
    });
    
    if (result.error) {
      return fail(400, {
        error: result.error.message,
        email,
      });
    }
    
    throw redirect(303, "/dashboard");
  },
  
  signup: async ({ request }) => {
    const data = await request.formData();
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const name = data.get("name") as string;
    
    const result = await authClient.signUp.email({
      email,
      password,
      name,
    });
    
    if (result.error) {
      return fail(400, {
        error: result.error.message,
        email,
        name,
      });
    }
    
    throw redirect(303, "/dashboard");
  },
  
  signout: async () => {
    await authClient.signOut();
    
    throw redirect(303, "/");
  },
};