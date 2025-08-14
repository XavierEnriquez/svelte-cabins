import {
  AuthFunctions,
  BetterAuth,
  PublicAuthFunctions,
} from "@convex-dev/better-auth";
import { api, components, internal } from "./_generated/api";
import { query } from "./_generated/server";
import { DataModel, Id } from "./_generated/dataModel";
// import { asyncMap } from "convex-helpers";

const authFunctions: AuthFunctions = internal.auth;
const publicAuthFunctions: PublicAuthFunctions = api.auth;

export const betterAuthComponent = new BetterAuth(components.betterAuth, {
  authFunctions,
  publicAuthFunctions,
  verbose: false,
});

export const {
  createUser,
  deleteUser,
  updateUser,
  createSession,
  isAuthenticated,
} = betterAuthComponent.createAuthFunctions<DataModel>({
  onCreateUser: async (ctx, user) => {
    // Example: copy the user's email to the application users table.
    // We'll use onUpdateUser to keep it synced.
    const userId = await ctx.db.insert("users", {
      name: user.name,
      email: user.email,
    });

    // This function must return the user id.
    return userId;
  },
  onDeleteUser: async (ctx, userId) => {
    // Delete the user's data if the user is being deleted
    // const todos = await ctx.db
    //   .query("todos")
    //   .withIndex("userId", (q) => q.eq("userId", userId as Id<"users">))
    //   .collect();
    // await asyncMap(todos, async (todo) => {
    //   await ctx.db.delete(todo._id);
    // });
    await ctx.db.delete(userId as Id<"users">);
  },
  onUpdateUser: async (ctx, user) => {
    const userId = user.userId as Id<"users">;
    await ctx.db.patch(userId, {
      // Enter the user's db fields to be synced
      email: user.email,
    });
  },
  onCreateSession: async (ctx, session) => {
    // Create a session for the user
    const sessionId = await ctx.db.insert("sessions", {
      userId: session.userId,
      sessionToken: session.token,
      createdAt: session.createdAt,
      expires: session.expiresAt,
    });

// Return the session ID
return sessionId;
  },
});

// Example function for getting the current user
// Feel free to edit, omit, etc.
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    // Get user data from Better Auth - email, name, image, etc.
    const userMetadata = await betterAuthComponent.getAuthUser(ctx);
    if (!userMetadata) {
      return null;
    }
    // Get user data from your application's database (skip this if you have no
    // fields in your users table schema)
    const user = await ctx.db.get(userMetadata.userId as Id<"users">);
    return {
      ...user,
      ...userMetadata,
    };
  },
});

// export const getSessionAndUser = adapterQuery({
// 	args: { sessionToken: v.string() },
// 	handler: async (ctx, { sessionToken }) => {
// 		const session = await ctx.db
// 			.query('sessions')
// 			.withIndex('sessionToken', (q) => q.eq('sessionToken', sessionToken))
// 			.unique();
// 		if (session === null) {
// 			return null;
// 		}
// 		const user = await ctx.db.get(session.userId);
// 		if (user === null) {
// 			return null;
// 		}
// 		return { session, user };
// 	}
// });


// import type{ Auth } from 'convex/server';
// import type{ Id } from './_generated/dataModel';

// export async function getViewerId(ctx: { auth: Auth }) {
// 	const identity = await ctx.auth.getUserIdentity();
// 	if (identity === null) {
// 		return null;
// 	}
// 	return identity.subject as Id<'users'>;
// }