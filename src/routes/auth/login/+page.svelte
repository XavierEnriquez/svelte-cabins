<script lang="ts">

</script>


<main class="m-8">
<h1 class="font-bold text-3xl mb-8">Login</h1>
<p>Don't have an account? <a href="/auth/sign-up" class="text-blue-500">Sign up</a></p>
<form class="flex flex-col gap-4 w-96 mt-8" action="/auth/login" method="post">
  <label for="email">Email</label>
  <input class="border border-gray-300 p-2 rounded" type="email" name="email" placeholder="email@youremail.com" required />
  <label for="password">Password</label>
  <input class="border border-gray-300 p-2 rounded" type="password" name="password" placeholder="********" required />
  <button class="bg-blue-500 text-white p-2 rounded" type="submit">Login</button>
</form>
</main>