<!-- <script lang="ts">
  
 const onSubmit = (e: Event) => {
    e.preventDefault(); // Prevent default form submission behavior
		const formData = new FormData(e.target as HTMLFormElement);

		const data: Record<string, string | File> = {};
		for (const field of formData.entries()) {
			const [key, value] = field;
			data[key] = value;
		}
	};
</script>


<main class="m-8">
<h1 class="font-bold text-3xl mb-8">Sign Up</h1>
<p>Already have an account? <a href="/api/auth/login" class="text-blue-500">Log in</a></p>
<form class="flex flex-col gap-4 w-96 mt-8" action="?/signup" method="post">
    <label  id="name" for="name">Name</label>
    <input autocomplete="name" class="border border-gray-300 p-2 rounded" type="text" name="name" placeholder="Name" required />
    <label id="email" for="email">Email</label>
    <input autocomplete="email" class="border border-gray-300 p-2 rounded" type="email" name="email" placeholder="email@youremail.com" required />
    <label id="password" for="password">Password</label>
    <input autocomplete="new-password" class="border border-gray-300 p-2 rounded" type="password" name="password" placeholder="********" required />
    <label id="confirm-password" for="confirm-password">Confirm Password</label>
    <input autocomplete="new-password" class="border border-gray-300 p-2 rounded" type="password" name="confirm-password" placeholder="********" required />
    <button class="bg-blue-500 text-white p-2 rounded" type="submit" onsubmit={onSubmit}>Sign Up</button>
</form>


</main> -->
<script lang="ts">
  import { authClient, useSession } from "$lib/auth-client";
  import { enhance } from "$app/forms";

const session = useSession();

  let name = "";
  let email = "";
  let password = "";
  
  // Using reactive stores (recommended approach)
  $: currentUser = $session.data?.user || null;
  // $: currentSession = $session.data?.session;
  $: expiresAt = $session.data?.session?.expiresAt || null;

  async function handleSignIn() {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });
    
    if (error) {
      console.error("Sign in failed:", error);
    }
  }

  async function handleSignUp(e: Event) {
    e.preventDefault(); // Prevent default form submission behavior
    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
    });
    
    if (error) {
      console.error("Sign up failed:", error);
    }
  }
  
  async function handleSignOut() {
    await authClient.signOut();
  }
  
  async function handleGoogleSignIn() {
    await authClient.signIn.social({
      provider: "google",
    });
  }
</script>
<main class="m-8">
  {#if currentUser}
  <div>
    <h1>Welcome, {currentUser.name || currentUser.email}!</h1>
    <p>Session expires: {expiresAt?.toLocaleString()}</p>
    <button onsubmit={handleSignOut}>Sign Out</button>
  </div>
  {:else}
  <div>
    <h2>Sign up</h2>
    <p>Already have an account? <a href="/api/auth/login" class="text-blue-500">Log in</a></p>
    <form class="flex flex-col gap-4 w-96 mt-8" onsubmit={handleSignUp}>
      <input bind:value={name} type="text" placeholder="Name" required />
      <input bind:value={email} type="email" placeholder="Email" required />
      <input bind:value={password} type="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
    
    <div class="divider">or</div>
    
    <button onsubmit={handleGoogleSignIn}>Sign in with Google</button>
    
    <div class="divider">Don't have an account?</div>
    
    <button onsubmit={handleSignUp}>Sign Up</button>
  </div>
  {/if}
</main>

<style>
  .divider {
    margin: 1rem 0;
    text-align: center;
    color: #666;
  }
</style>