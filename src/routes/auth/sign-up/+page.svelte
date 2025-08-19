<script lang="ts">
	import { authClient } from "$lib/auth-client";

  const session = authClient.useSession();
  $: currentUser = $session.data?.user || null;
  $: expiresAt = $session.data?.session?.expiresAt || null;

  let name = "Test";
  let email = "test@example.com";
  let password = "password123";
  let confirmPassword = "password123";
  let isLoading = false;

  const handleSignUp = async (event: Event) => {
    event.preventDefault(); // Prevent default form submission
    
    if (password !== confirmPassword) {
      window.alert("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      window.alert("Password must be at least 6 characters long");
      return;
    }

    isLoading = true;

    try {
      const {data, error} = await authClient.signUp.email({
        name,
        email,
        password
      }, {
        onError: (ctx) => {
          console.error("Signup error:", ctx.error);
          window.alert(ctx.error.message);
        },
        onSuccess: () => {
          console.log("Signup successful!");
          // Optionally redirect or show success message
        }
      });
      
      console.log("Signup result:", { data, error });
      
      if (error) {
        console.error("Signup failed:", error);
        window.alert(error.message || "Signup failed");
      }
    } catch (err) {
      console.error("Unexpected signup error:", err);
      window.alert("An unexpected error occurred during signup");
    } finally {
      isLoading = false;
    }
  }

  async function handleSignOut(event: Event) {
    event.preventDefault();
    try {
      await authClient.signOut();
    } catch (err) {
      console.error("Sign out error:", err);
    }
  }

  async function handleGoogleSignIn(event: Event) {
    event.preventDefault();
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (err) {
      console.error("Google sign in error:", err);
      window.alert("Google sign in failed");
    }
  }
</script>

<main class="m-8">
  {#if currentUser}
  <div>
    <h1 class="mb-8">Welcome, {currentUser.name || currentUser.email}!</h1>
    <p>Session expires: {expiresAt?.toLocaleString()}</p>
    <button 
      class="bg-red-500 text-white p-2 rounded hover:bg-red-600"
      on:click={handleSignOut}
    >
      Sign Out
    </button>
  </div>
  {:else}
  <div>
    <h1 class="font-bold text-3xl mb-8">Sign up</h1>
    <p>Already have an account? <a href="/auth/login" class="text-blue-500 hover:underline">Log in</a></p>
    
    <form class="flex flex-col gap-2 w-96 mt-8" on:submit={handleSignUp}>
      <label for="name">Name</label>
      <input 
        autocomplete="name" 
        bind:value={name} 
        class="border border-gray-300 p-2 rounded focus:border-blue-500 focus:outline-none" 
        type="text" 
        name="name" 
        id="name"
        placeholder="Name" 
        required 
        disabled={isLoading}
      />
      
      <label for="email">Email</label>
      <input 
        autocomplete="email" 
        bind:value={email} 
        class="border border-gray-300 p-2 rounded focus:border-blue-500 focus:outline-none" 
        type="email" 
        name="email" 
        id="email"
        placeholder="email@youremail.com" 
        required 
        disabled={isLoading}
      />
      
      <label for="password">Password</label>
      <input 
        autocomplete="new-password" 
        bind:value={password} 
        class="border border-gray-300 p-2 rounded focus:border-blue-500 focus:outline-none" 
        type="password" 
        name="password" 
        id="password"
        placeholder="********" 
        required 
        disabled={isLoading}
        minlength="6"
      />
      
      <label for="confirm-password">Confirm Password</label>
      <input 
        autocomplete="new-password" 
        bind:value={confirmPassword} 
        class="border border-gray-300 p-2 rounded focus:border-blue-500 focus:outline-none" 
        type="password" 
        name="confirm-password" 
        id="confirm-password"
        placeholder="********" 
        required 
        disabled={isLoading}
        minlength="6"
      />
      
      <button 
        class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed mt-4" 
        type="submit" 
        disabled={isLoading}
      >
        {isLoading ? "Signing up..." : "Sign Up"}
      </button>
    </form>

    <div class="divider">or</div>

    <button 
      class="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed" 
      on:click={handleGoogleSignIn}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : "Sign up with Google"}
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