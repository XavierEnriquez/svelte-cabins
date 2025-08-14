<script lang="ts">
  

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
<h1 class="font-bold text-3xl mb-8">Login</h1>
<p>Don't have an account? <a href="/auth/signup" class="text-blue-500">Sign up</a></p>
<form class="flex flex-col gap-4 w-96 mt-8" action="/auth/login" method="post">
  <label id="email" for="email">Email</label>
  <input autocomplete="email" class="border border-gray-300 p-2 rounded" type="email" name="email" placeholder="email@youremail.com" required />
  <label id="password" for="password">Password</label>
  <input autocomplete="current-password"  class="border border-gray-300 p-2 rounded" type="password" name="password" placeholder="********" required />
  <button class="bg-blue-500 text-white p-2 rounded" type="submit" onsubmit={onSubmit}>Login</button>
</form>


</main>