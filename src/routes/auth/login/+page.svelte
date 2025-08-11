<script lang="ts">
  import { authClient } from "$lib/auth-client";
	import Header from "$lib/ui/Header.svelte";
  const session = authClient.useSession();
</script>
<Header />
<main class="m-8">
<h1 class="font-bold text-3xl mb-8">Svelte Cabins Login Page</h1>
<div>
      {#if $session.data}
        <div>
          <p>
            {$session?.data?.user.name}
          </p>
          <button
            on:click={async () => {
              await authClient.signOut();
            }}
          >
            Sign Out
          </button>
        </div>
      {:else}
        <button
          on:click={async () => {
            await authClient.signIn.social({
              provider: "github",
            });
          }}
        >
          Login with GitHub
        </button>
        <a href="/auth/signup" class="ml-4">
          Sign Up
        </a>
      {/if}
    </div>
</main>