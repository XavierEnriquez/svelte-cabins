import Header from "$lib/ui/Header.svelte";

// place files you want to import through the `$lib` alias in this folder.
export default Header;

export { authClient } from "$lib/auth-client";
export { auth } from "$lib/auth";
export { createAuth } from "$lib/auth";