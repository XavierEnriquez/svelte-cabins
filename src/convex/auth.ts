// convex/auth.ts (Fixed version)
import {
  BetterAuth,
  type AuthFunctions,
  type PublicAuthFunctions
} from "@convex-dev/better-auth";
import { api, components, internal } from "./_generated/api";
import { query } from "./_generated/server";
import type { DataModel, Id } from "./_generated/dataModel";

// Typesafe way to pass Convex functions defined in this file
const authFunctions: AuthFunctions = internal.auth;
const publicAuthFunctions: PublicAuthFunctions = api.auth;

// Initialize the component
export const betterAuthComponent = new BetterAuth(components.betterAuth, {
  authFunctions,
  publicAuthFunctions,
  verbose: false,
});

// Required auth functions for user lifecycle
export const { createUser, deleteUser, updateUser, createSession, isAuthenticated } =
  betterAuthComponent.createAuthFunctions<DataModel>({
    // Must create a user and return the user id
    onCreateUser: async (ctx, user) => {
      const userId = await ctx.db.insert("users", {
        // Add any app-specific fields here
        // Example: email: user.email, name: user.name
        name: user.name,
        email: user.email,
      });
      // The user id must be returned
      return userId;
    },
    
    onUpdateUser: async (ctx, user) => {
      // Update your app's user record if needed
      await ctx.db.patch(user.userId as Id<"users">, {
        // Update any synced fields
        // Example: email: user.email, name: user.name
      });
    },

    // Delete the user when they are deleted from Better Auth
    onDeleteUser: async (ctx, userId) => {
      await ctx.db.delete(userId as Id<"users">);
      // Optionally delete any related data
    },
  });

  // Example function for getting the current user
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    // Get user data from Better Auth - email, name, image, etc.
    const userMetadata = await betterAuthComponent.getAuthUser(ctx);
    if (!userMetadata) {
      return null;
    }

    // Get user data from your application's database
    // (skip this if you have no fields in your users table schema)
    const user = await ctx.db.get(userMetadata.userId as Id<"users">);
    
    return {
      ...user,
      ...userMetadata,
    };
  },
});