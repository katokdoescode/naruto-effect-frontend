<script>
	import Content from '$lib/modules/Content.svelte';
	import Login from '$lib/modules/Login.svelte';
	import MainPanel from '$lib/modules/MainPanel.svelte';
	import MobileHeader from '$lib/modules/MobileHeader.svelte';
	import SecondaryPanel from '$lib/modules/SecondaryPanel.svelte';
	import { handleKeydown, handleKeyup } from '$lib/utils/keyboardHandler';
	import { getContext, onDestroy, onMount, setContext } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { writable } from 'svelte/store';

	/** @type {{ authorized: boolean, practices: Array<object>, participants: Array<object>, pageData: MainPageData }} */
	export let data;

	const combo = writable();
	const authorized = writable();
	let practices = data?.practices || [];
	let participants = data?.participants || [];
	let socialLinks = data?.pageData?.socialLinks || [];
	let participateLink = data?.pageData?.participateLink || [];

	$: open = false;
	$: authorized.set(data?.authorized || false);

	function authorize() {
		authorized.set(true);
		closeLoginModal();
	}

	function closeLoginModal() {
		combo.set(false);
		open = false;
	}

	function logoController() {
		const idx = localStorage.getItem('logoIdx');
		const logoIdx = idx ? Number(idx) : 0;
		const newIdx = logoIdx < 10 ? logoIdx + 1 : 1;
		localStorage.setItem('logoIdx', newIdx.toString());
	}

	function initHandlers() {
		window.addEventListener('keydown', (e) => combo.set(handleKeydown(e)));
		window.addEventListener('keyup', handleKeyup);
	}

	function destroyHandlers() {
		window.removeEventListener('keydown', handleKeydown);
		window.removeEventListener('keyup', handleKeyup);
	}

	onMount(() => {
		const settedLocale = localStorage.getItem('userLang');
		if (settedLocale) locale.set(settedLocale);

		locale.subscribe((lang) => {
			document.querySelector('html').lang = lang;
			localStorage.setItem('userLang', lang);
		});

		initHandlers();
		logoController();
	});

	onDestroy(() => {
		destroyHandlers;
	});

	setContext('authorized', authorized);
	setContext('combo', combo);
	getContext('combo').subscribe((pressed) => {
		if (pressed) open = true;
	});
</script>

<div class="screen main-layout">
	<MainPanel
		{practices}
		{socialLinks} />

	<MobileHeader
		{participants}
		{participateLink}
		{practices}
		{socialLinks} />

	<Content>
		<slot />
		<svelte:fragment slot="login">
			<Login
				bind:open
				on:success={authorize}
				on:close={closeLoginModal} />
		</svelte:fragment>
	</Content>

	<SecondaryPanel
		{participants}
		{participateLink} />
</div>

<style>
	.main-layout {
		container: main / inline-size;
		display: flex;
		height: calc(100svh - var(--initial-padding-top));
		justify-content: space-between;
		padding: var(--body-padding);
		max-width: var(--max-content-width);
		margin: 0 auto;
		column-gap: var(--sections-padding);
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
