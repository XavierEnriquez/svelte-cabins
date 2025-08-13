<script lang="ts">
const onSubmit = (e: Event) => {
		const formData = new FormData(e.target as HTMLFormElement);

		const data: Record<string, string | File> = {};
		for (const field of formData.entries()) {
			const [key, value] = field;
			data[key] = value;
		}
		console.log(data);
	};
</script>


<main class="m-8">
<h1 class="font-bold text-3xl mb-8">Sign Up</h1>
<p>Already have an account? <a href="/auth/login" class="text-blue-500">Log in</a></p>
<form class="flex flex-col gap-4 w-96 mt-8" action="/auth/login" method="post">
    <label for="name">Name</label>
    <input class="border border-gray-300 p-2 rounded" type="text" name="name" placeholder="Name" required />
    <label for="email">Email</label>
    <input class="border border-gray-300 p-2 rounded" type="email" name="email" placeholder="email@youremail.com" required />
    <label for="password">Password</label>
    <input class="border border-gray-300 p-2 rounded" type="password" name="password" placeholder="********" required />
    <label for="confirm-password">Confirm Password</label>
    <input class="border border-gray-300 p-2 rounded" type="password" name="confirm-password" placeholder="********" required />
    <button class="bg-blue-500 text-white p-2 rounded" type="submit">Sign Up</button>
</form>

</main>