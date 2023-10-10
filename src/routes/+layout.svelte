<script>
	import { onMount, onDestroy } from 'svelte';
	import MainPanel from '$lib/modules/MainPanel.svelte';
	import Content from '$lib/modules/Content.svelte';
	import SecondaryPanel from '$lib/modules/SecondaryPanel.svelte';
	import Login from '$lib/modules/Login.svelte';
	import { initHandlers, destroyHandlers } from '$lib/utils/keyboardHandler';
	let open = false;

	function openDialog() {
		open = true;
	}

	onMount(() => {
		initHandlers;
	});

	onDestroy(() => {
		destroyHandlers;
	});
</script>

<div class="screen home">
	<MainPanel />

	<Content>
		<slot />
	</Content>

	<SecondaryPanel />
	<button on:click={openDialog}>Open</button>
	<Login bind:open />
</div>
