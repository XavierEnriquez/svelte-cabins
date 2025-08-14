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
<h1 class="font-bold text-3xl mb-8">Sign Up</h1>
<p>Already have an account? <a href="/auth/login" class="text-blue-500">Log in</a></p>
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


</main>