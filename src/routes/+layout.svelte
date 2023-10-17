<script>
	import { onMount, onDestroy } from 'svelte';
	import MainPanel from '$lib/modules/MainPanel.svelte';
	import Content from '$lib/modules/Content.svelte';
	import SecondaryPanel from '$lib/modules/SecondaryPanel.svelte';
	import Login from '$lib/modules/Login.svelte';
	import { initHandlers, destroyHandlers } from '$lib/utils/keyboardHandler';
	import { locale } from 'svelte-i18n';
	import { enhance } from '$app/forms';

	let open = false;

	/**
	 * @type {{ authorized: boolean; }}
	 */
	export let data;

	let authorized = data?.authorized;

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
	{#if authorized}
		<form method="POST" action="/api/signOut" use:enhance={signOut}>
			<button type="submit">Sign Out</button>
		</form>
	{:else}
		<button on:click={openDialog}>Sign In</button>
	{/if}
	<Login bind:open on:success={authorize} />
</div>
