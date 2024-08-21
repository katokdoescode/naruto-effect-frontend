<script>
import { onNavigate } from '$app/navigation';
import { page } from '$app/stores';
import Logo from '$lib/modules/Logo.svelte';
import MainNav from '$lib/modules/MainNav.svelte';
import SecondNav from '$lib/modules/SecondNav.svelte';
import Burger from '$lib/ui/Burger.svelte';
import Button from '$lib/ui/Button.svelte';
import { createEventDispatcher, getContext } from 'svelte';
import { _ } from 'svelte-i18n';
import BurgerMenu from './BurgerMenu.svelte';
import MobileEditPanel from './hokage/MobileEditPanel.svelte';

const dispatch = createEventDispatcher();

const authorized = getContext('authorized');

export let practices;
export let participants;
export let pageLinks;

$: isBurgerMenuOpened = false;
$: isMainMenuOpened = false;
$: isSecondaryMenuOpened = false;
$: isAnyMenuOpened =
	isBurgerMenuOpened || isMainMenuOpened || isSecondaryMenuOpened;
$: if (isBurgerMenuOpened) {
	toggleMainMenu(false);
	toggleSecondaryMenu(false);
}

/**
 * @param {boolean|unknown} [prevent]
 */
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

/**
 * @param {boolean|unknown} [prevent]
 */
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

function hideAllMenus() {
	isBurgerMenuOpened = false;
	isSecondaryMenuOpened = false;
	isMainMenuOpened = false;
}

onNavigate(() => hideAllMenus());
</script>

<header
	class="mobile-header no-desktop"
	data-menu-is-opened={isAnyMenuOpened}>
	<div class="top">
		<Logo />
		<Burger bind:isOpened={isBurgerMenuOpened} />
	</div>

	<div class="bottom">
		{#if $authorized && !isAnyMenuOpened}
			<MobileEditPanel />
		{:else}
			<Button
				id="control-main-menu"
				active={isMainMenuOpened}
				aria-controls="main-menu"
				aria-expanded={isMainMenuOpened}
				on:click={toggleMainMenu}
			>
				{$_('mainMenu.practices')}
			</Button>

			<a
				class:active={$page.url.pathname.includes('/cv')}
				href="/cv">CV</a>
			<a
				class:active={$page.url.pathname.includes('/projects')}
				href="/projects">{$_('mainMenu.projects')}</a>

			<Button
				id="control-second-menu"
				active={isSecondaryMenuOpened}
				aria-controls="second-menu"
				aria-expanded={isSecondaryMenuOpened}
				on:click={toggleSecondaryMenu}
			>
				{$_('mainMenu.participants')}
			</Button>
		{/if}
	</div>

	{#if isAnyMenuOpened}
		<section class="shower">
			{#if isMainMenuOpened}
				<MainNav
					aria-hidden="false"
					{practices} />
			{/if}
			{#if isSecondaryMenuOpened}
				<SecondNav
					aria-hidden="false"
					{participants} />
			{/if}
			{#if isBurgerMenuOpened}
				<BurgerMenu
					aria-hidden="false"
					{pageLinks}
					on:logout={() => dispatch('logout')}
				/>
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
		box-sizing: border-box;
	}

	.mobile-header .top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.mobile-header .bottom {
		display: flex;
		justify-content: space-between;
		font-weight: var(--font-menu-weight);
		font-size: var(--font-main-menu-size);
		gap: 2em 1em;
		flex-wrap: wrap;
	}

	.mobile-header .shower {
		flex-shrink: 1;
		min-height: 0;
		height: 100%;
	}

	.mobile-header[data-menu-is-opened='true'] {
		position: fixed;
		top: 0;
		left: 0;
		height: 100svh;
		width: 100%;
		z-index: 1;
		padding: var(--body-padding);
	}

	:global(body:has(.mobile-header[data-menu-is-opened='true'])) {
		overflow: hidden;
	}
</style>
