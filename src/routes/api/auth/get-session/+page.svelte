<script lang="ts">
  import { authClient } from "$lib/auth-client";
	import Header from "$lib/components/Header.svelte";
  const session = authClient.useSession();
</script>
    
<Header />
<main class="m-8">
<h1 class="font-bold text-3xl mb-8">API Auth Page</h1>
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
        <p>
          {$session.error
            ? "Error: " + $session.error.message
            : "You are not signed in."}
        </p>
      {/if}
    </div>
</main>