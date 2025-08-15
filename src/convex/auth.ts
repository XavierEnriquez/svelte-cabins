// convex/auth.ts (Fixed version)
import {
  BetterAuth,
  convexAdapter,
  type AuthFunctions,
  type PublicAuthFunctions
} from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { betterAuth, type BetterAuthOptions } from "better-auth";
import { organization } from "better-auth/plugins";
import { api, components, internal } from "./_generated/api";
import { query, type GenericCtx } from "./_generated/server";
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

const createOptions = () => {
  return ({
    baseURL: "https://localhost:5173",
    account: {
      accountLinking: {
        enabled: true,
        allowDifferentEmails: true,
      },
    },
    // Simple non-verified email/password to get started
     emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      // sendResetPassword: async ({ user, url }) => {
      //   await sendResetPassword(requireMutationCtx(ctx), {
      //     to: user.email,
      //     url,
      //   });
      // },
    },
    // emailVerification: {
    //   sendVerificationEmail: async ({ user, url }) => {
    //     await sendEmailVerification(requireMutationCtx(ctx), {
    //       to: user.email,
    //       url,
    //     });
    //   },
    // },
   
    socialProviders: {
      // github: {
      //   clientId: process.env.GITHUB_CLIENT_ID as string,
      //   clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      // },
      // google: {
      //   clientId: process.env.GOOGLE_CLIENT_ID as string,
      //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      //   accessType: "offline",
      //   prompt: "select_account+consent",
      // },
    },
    user: {
      deleteUser: {
        enabled: true,
      },
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60 // Cache duration in seconds
        }
    },
    plugins: [
      // magicLink({
      //   sendMagicLink: async ({ email, url }) => {
      //     await sendMagicLink(requireMutationCtx(ctx), {
      //       to: email,
      //       url,
      //     });
      //   },
      // }),
      // emailOTP({
      //   async sendVerificationOTP({ email, otp }) {
      //     await sendOTPVerification(requireMutationCtx(ctx), {
      //       to: email,
      //       code: otp,
      //     });
      //   },
      // }),
      // twoFactor(),
      // genericOAuth({
      //   config: [
      //     {
      //       providerId: "slack",
      //       clientId: process.env.SLACK_CLIENT_ID as string,
      //       clientSecret: process.env.SLACK_CLIENT_SECRET as string,
      //       discoveryUrl: "https://slack.com/.well-known/openid-configuration",
      //       scopes: ["openid", "email", "profile"],
      //     },
      //   ],
      // }),
      organization(),
    ],
  }) satisfies BetterAuthOptions;
};

const dbadapter = (ctx: GenericCtx) => convexAdapter(ctx, betterAuthComponent);

// Create the auth instance
export const createAuth = () =>{
const options = createOptions();
  // Configure your Better Auth instance here
  return betterAuth({
    ...options,
    database: dbadapter,
    plugins: [
      // The Convex plugin is required
      convex(),
    ],
  })
}
  ;



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