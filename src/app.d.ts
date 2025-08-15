// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface PageData {
      session?: {
        user: BetterAuthUser;
        sessionId: string;
        expiresAt: Date;
        token: string;
      } | null;
      user?: BetterAuthUser | null;
    }
    
    interface Locals {
      session?: {
        user: BetterAuthUser;
        sessionId: string;
        expiresAt: Date;
        token: string;
      } | null;
      user?: BetterAuthUser | null;
    }
	}
}

export {};
