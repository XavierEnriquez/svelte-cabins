import { authClient } from "$lib/auth-client";
import type { Actions } from "./$types";

export const actions: Actions = {
	signin: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get("email");
		const password = formData.get("password");

		if (typeof email !== "string" || typeof password !== "string") {
			return { error: "Invalid input" };
		}

		const user = await authClient.signIn.email({ email, password });
		if (!user) {
			return { error: "Invalid email or password" };
		}

		return { user };
	},
    signup: async (event) => {
		const formData = await event.request.formData();
        const name = formData.get("name");
		const email = formData.get("email");
		const password = formData.get("password");

		if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
			return { error: "Invalid input" };
		}

		const user = await authClient.signUp.email({ name, email, password });
		if (!user) {
			return { error: "Failed to create user" };
		}

		return { user };
	},
	signOut: async () => {
		await authClient.signOut();
		return { success: true };
	}
};
