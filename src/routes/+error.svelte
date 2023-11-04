<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/ui/Button.svelte';

	let disabled = true;
	let counter = 5;

	function startCountdown() {
		const intervalId = setInterval(() => {
			counter--;

			if (counter <= 0) {
				clearInterval(intervalId);
				disabled = false;
			}
		}, 1000);
	}

	startCountdown();

	function reloadPage() {
		window.location.reload();
	}
</script>

<h1>Oops...</h1>
<article class="error">
	<strong>Error message:</strong>
	<code>{$page.error.message}</code>
	<Button
		{disabled}
		on:click={reloadPage}>Reload page</Button>
	{#if counter}
		{counter} seconds to restart
	{/if}
</article>
