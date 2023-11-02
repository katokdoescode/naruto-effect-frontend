<script>
	import { page } from '$app/stores';
	import Content from '$lib/modules/Content.svelte';
	import Login from '$lib/modules/Login.svelte';
	import MainPanel from '$lib/modules/MainPanel.svelte';
	import MobileHeader from '$lib/modules/MobileHeader.svelte';
	import SecondaryPanel from '$lib/modules/SecondaryPanel.svelte';
	import { destroyHandlers, initHandlers } from '$lib/utils/keyboardHandler';
	import { onDestroy, onMount } from 'svelte';
	import { locale } from 'svelte-i18n';

	/** @type {{ authorized: boolean, practices: Array<object>, participants: Array<object>, pageData: MainPageData }} */
	export let data;

	let authorized = data?.authorized;
	let practices = data?.practices;
	let participants =
		$page.data?.participants || $page.data?.practice.participants;
	let socialLinks = data?.pageData?.socialLinks;
	let participateLink = data?.pageData?.participateLink;

	let open = false;

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
				{authorized}
				bind:open
				on:success={authorize} />
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
		height: 100svh;
		justify-content: space-between;
		box-sizing: border-box;
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
