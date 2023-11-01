<script>
	import { enhance } from '$app/forms';

	import Login from '$lib/modules/Login.svelte';

	export let data;
	let authorized = data?.authorized;

	let open = false;

	function openDialog() {
		open = true;
	}

	function signOut() {
		return async ({ result }) => {
			if (result.success) {
				authorized = false;
			}
		};
	}

	function authorize() {
		authorized = true;
	}
</script>

{#if authorized}
	<form
		action="/api/signOut"
		method="POST"
		use:enhance={signOut}>
		<button type="submit">Sign Out</button>
	</form>
{:else}
	<button on:click={openDialog}>Sign In</button>
{/if}
<Login
	bind:open
	on:success={authorize} />
