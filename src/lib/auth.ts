import { organization } from "better-auth/plugins";
import { betterAuthComponent } from "../convex/auth";
import { convexAdapter } from "@convex-dev/better-auth";
import { convex, crossDomain } from "@convex-dev/better-auth/plugins";
import type { GenericCtx } from "../convex/_generated/server";
import { betterAuth, type BetterAuthOptions } from "better-auth";

const createOptions = () => {
  return ({
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

const siteUrl = process.env.VITE_SITE_URL || "http://127.0.0.1:5173";

// Create the auth instance
export const createAuth = (ctx: GenericCtx) =>{ 
    const options = createOptions();
    return betterAuth({
      baseURL: siteUrl,
      secret: process.env.BETTER_AUTH_SECRET!,
      trustedOrigins: [siteUrl],
      database: convexAdapter(ctx, betterAuthComponent),
      ...options,
      plugins: [
        // The Convex plugin is required
        convex({ options }),
        crossDomain({
        siteUrl,
      }),
    // Pass in options so plugin schema inference flows through. Only required
    // for plugins that customize the user or session schema.
    // See "Some caveats":
    // https://www.better-auth.com/docs/concepts/session-management#customizing-session-response
    ...options.plugins,   
  ],
});}

// auth instance without ctx inferring types from Better Auth options
export const auth = createAuth({} as GenericCtx);