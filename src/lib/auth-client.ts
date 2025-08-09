import { convexClient } from "@convex-dev/better-auth/client/plugins";
import { createAuthClient } from "better-auth/svelte"

// If you're using a different base path other than /api/auth make sure to pass the whole URL including the path. (e.g. http://localhost:3000/custom-path/auth)
// export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    // baseURL: "http://localhost:3000"
// })


export const authClient = createAuthClient({
  // you can pass client configuration here
  plugins: [
    convexClient()
  ]
});