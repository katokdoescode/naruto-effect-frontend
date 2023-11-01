<script>
	import { enhance } from '$app/forms';
	import Content from '$lib/modules/Content.svelte';
	import Login from '$lib/modules/Login.svelte';
	import MainPanel from '$lib/modules/MainPanel.svelte';
	import MobileHeader from '$lib/modules/MobileHeader.svelte';
	import SecondaryPanel from '$lib/modules/SecondaryPanel.svelte';
	import { destroyHandlers, initHandlers } from '$lib/utils/keyboardHandler';
	import { onDestroy, onMount } from 'svelte';
	import { locale } from 'svelte-i18n';

	let open = false;

	/** @type {{ authorized: boolean, practices: Array<object>, participants: Array<object>, pageData: MainPageData }} */
	export let data;

	let authorized = data?.authorized;
	let practices = data?.practices;
	let participants = data?.participants;
	let socialLinks = data?.pageData?.socialLinks;
	let participateLink = data?.pageData?.participateLink;

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

<div class="screen main-layout">
	<MainPanel {practices} />
	<MobileHeader {participateLink} {socialLinks} {practices} {participants} />

	<Content>
		<slot />
		<svelte:fragment slot="login">
			{#if authorized}
				<form method="POST" action="/api/signOut" use:enhance={signOut}>
					<button type="submit">Sign Out</button>
				</form>
			{:else}
				<button on:click={openDialog}>Sign In</button>
			{/if}
			<Login bind:open on:success={authorize} />
		</svelte:fragment>
	</Content>

	<SecondaryPanel {participants} />
</div>

<style>
	.main-layout {
		container: main / inline-size;
		display: flex;
		height: 100svh;
		justify-content: space-between;
		box-sizing: border-box;
		padding-top: var(--initial-padding-top);
	}

	@media (width <= 1018px) {
		.main-layout {
			height: auto;
			flex-direction: column;
			justify-content: start;
			align-items: stretch;
		}
	}

	@media (width <= 1018px) {
		:global(.main-layout .panel) {
			flex: 1 0 auto;
			width: 100%;
			padding: 0;
			max-width: unset;
			min-width: unset;
			overflow: auto;
		}
	}
</style>
