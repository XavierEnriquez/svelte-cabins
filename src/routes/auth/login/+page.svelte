<script lang="ts">
  import { authClient } from "$lib/auth-client";

  const session = authClient.useSession();
  $: currentUser = $session.data?.user || null;
  $: expiresAt = $session.data?.session?.expiresAt || null;

  let email = "";
  let password = "";
  // let confirmPassword = "";

  async function handleSubmit(event: Event) {
    event.preventDefault(); // Prevent default form submission

    await authClient.signIn.email({
      email,
      password
    }, {
      onError: (ctx) => {
        window.alert(ctx.error.message);
      },
      onSuccess: () => {
        // Handle successful signup
        console.log("Signup successful!");
      }
    });
  }

  async function handleSignOut(event: Event) {
    event.preventDefault();
    await authClient.signOut();
  }

  async function handleGoogleSignIn(event: Event) {
    event.preventDefault();
    await authClient.signIn.social({
      provider: "google",
    });
  }
</script>

<main class="m-8">
  {#if currentUser}
  <div>
    <h1 class="mb-8">Welcome, {currentUser.name || currentUser.email}!</h1>
    <p>Session expires: {expiresAt?.toLocaleString()}</p>
    <button on:click={handleSignOut}>Sign Out</button>
  </div>
  {:else}
  <div>
    <h1 class="font-bold text-3xl mb-8">Sign up</h1>
    <p>Don't have an account? <a href="/auth/sign-up" class="text-blue-500">Sign up</a></p>

    <form class="flex flex-col gap-2 w-96 mt-8" on:submit={handleSubmit}>
      <label for="email">Email</label>
      <input 
        autocomplete="email" 
        bind:value={email} 
        class="border border-gray-300 p-2 rounded" 
        type="email" 
        name="email" 
        id="email"
        placeholder="email@youremail.com" 
        required 
      />
      
      <label for="password">Password</label>
      <input 
        autocomplete="new-password" 
        bind:value={password} 
        class="border border-gray-300 p-2 rounded" 
        type="password" 
        name="password" 
        id="password"
        placeholder="********" 
        required 
      />
      
      <button class="bg-blue-500 text-white p-2 rounded" type="submit">
        Sign Up
      </button>
    </form>

    <div class="divider">or</div>

    <button 
      class="bg-blue-500 text-white p-2 rounded w-full" 
      on:click={handleGoogleSignIn}
    >
      Sign up with Google
    </button>
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