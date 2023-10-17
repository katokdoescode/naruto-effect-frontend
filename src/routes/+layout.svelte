<script>
	import { onMount, onDestroy } from 'svelte';
	import MainPanel from '$lib/modules/MainPanel.svelte';
	import Content from '$lib/modules/Content.svelte';
	import SecondaryPanel from '$lib/modules/SecondaryPanel.svelte';
	import Login from '$lib/modules/Login.svelte';
	import { initHandlers, destroyHandlers } from '$lib/utils/keyboardHandler';
	let open = false;
	import { locale } from 'svelte-i18n';

	function openDialog() {
		open = true;
	}

	onMount(() => {
		initHandlers;
		const settedLocale = localStorage.getItem('userLang');
		if (settedLocale) locale.set(settedLocale);

		locale.subscribe((lang) => {
			document.querySelector('html').lang = lang;
			localStorage.setItem('userLang', lang);
		});
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
