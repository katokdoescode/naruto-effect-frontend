<script>
	import { enhance } from '$app/forms';
	import Content from '$lib/modules/Content.svelte';
	import Login from '$lib/modules/Login.svelte';
	import MainPanel from '$lib/modules/MainPanel.svelte';
	import SecondaryPanel from '$lib/modules/SecondaryPanel.svelte';
	import { destroyHandlers, initHandlers } from '$lib/utils/keyboardHandler';
	import { onDestroy, onMount } from 'svelte';
	import { locale } from 'svelte-i18n';

	let open = false;

	/**
	 * @type {{ authorized: boolean, practices: Array<object>, participants: Array<object> }}
	 */
	export let data;

	let authorized = data?.authorized;
	let practices = data?.practices;
	let participants = data?.participants;

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
		initHandlers(window);
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
	<MainPanel {practices} />

	<Content>
		<slot />
	</Content>

	<SecondaryPanel {participants} />
	{#if authorized}
		<form method="POST" action="/api/signOut" use:enhance={signOut}>
			<button type="submit">Sign Out</button>
		</form>
	{:else}
		<button on:click={openDialog}>Sign In</button>
	{/if}
	<Login bind:open on:success={authorize} />
</div>
