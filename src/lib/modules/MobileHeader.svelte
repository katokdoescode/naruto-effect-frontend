<script>
	import Logo from '$lib/modules/Logo.svelte';
	import MainNav from '$lib/modules/MainNav.svelte';
	import SecondNav from '$lib/modules/SecondNav.svelte';
	import Burger from '$lib/ui/Burger.svelte';
	import Button from '$lib/ui/Button.svelte';
	import { _ } from 'svelte-i18n';

	export let practices;
	export let participants;

	$: isBurgerMenuOpened = false;
	$: isMainMenuOpened = false;
	$: isSecondaryMenuOpened = false;
	$: isAnyMenuOpened =
		isBurgerMenuOpened || isMainMenuOpened || isSecondaryMenuOpened;
	$: if (isBurgerMenuOpened) {
		toggleMainMenu(false);
		toggleSecondaryMenu(false);
	}

	function toggleMainMenu(prevent) {
		if (prevent !== undefined && (prevent === true || prevent === false)) {
			isMainMenuOpened = prevent;
			isBurgerMenuOpened = !prevent;
			return;
		}
		isMainMenuOpened = !isMainMenuOpened;

		isBurgerMenuOpened = false;
		isSecondaryMenuOpened = false;
	}

	function toggleSecondaryMenu(prevent) {
		if (prevent !== undefined && (prevent === true || prevent === false)) {
			isSecondaryMenuOpened = prevent;
			isBurgerMenuOpened = !prevent;
			return;
		}

		isSecondaryMenuOpened = !isSecondaryMenuOpened;

		isBurgerMenuOpened = false;
		isMainMenuOpened = false;
	}
</script>

<header class="mobile-header no-desktop" data-menu-is-opened={isAnyMenuOpened}>
	<div class="top">
		<Logo />
		<Burger bind:isOpened={isBurgerMenuOpened} />
	</div>

	<div class="bottom">
		<Button on:click={toggleMainMenu}>
			{$_('mainMenu.practices')}
		</Button>

		<a href="/cv">CV</a>

		<Button on:click={toggleSecondaryMenu}>
			{$_('mainMenu.participants')}
		</Button>
	</div>

	{#if isAnyMenuOpened}
		<section class="shower">
			{#if isMainMenuOpened}
				<MainNav {practices} />
			{/if}
			{#if isSecondaryMenuOpened}
				<SecondNav {participants} />
			{/if}
		</section>
	{/if}
</header>

<style scoped>
	.mobile-header {
		display: flex;
		flex-direction: column;
		row-gap: 20px;
		background-color: var(--color-bg-main);
	}

	.mobile-header .top {
		display: flex;
		justify-content: space-between;
	}

	.mobile-header .bottom {
		display: flex;
		justify-content: space-between;
		font-weight: bold;
	}

	.mobile-header .shower {
		flex-shrink: 1;
		min-height: 0;
		height: 100%;
	}

	.mobile-header[data-menu-is-opened='true'] {
		background-color: tomato;
		position: fixed;
		top: 0;
		left: 0;
		height: 100svh;
		width: 100%;
		z-index: 2;
		padding-top: var(--initial-padding-top);
	}

	:global(body:has(.mobile-header[data-menu-is-opened='true'])) {
		overflow: hidden;
	}
</style>
