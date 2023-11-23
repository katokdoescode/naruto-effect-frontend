<script>
	import { page } from '$app/stores';
	import ShadowWrapper from '$lib/modules/ShadowWrapper.svelte';
	import Button from '$lib/ui/Button.svelte';
	import { getContext } from 'svelte';
	import { _, locale } from 'svelte-i18n';

	/** @type{Practices} */
	export let practices = [];
	/** @type {SocialLink[]}*/
	export let socialLinks = [];
	const authorized = getContext('authorized');
	const isEditingState = getContext('isEditingState');

	$: pageName = $page.url.pathname.split('/')[1];
	$: isMainPage = pageName === '';

	function cancelCreating() {
		isEditingState.set(false);
		if ($page.url.pathname.includes('/create')) {
			window.location.assign('/');
		}
	}

	$: visiblePractices = practices
		? practices
			.filter(({ isVisible }) => Boolean(isVisible))
			.sort((a, b) => {
				return a.title[$locale] - b.title[$locale]; // Sort practices by localized title [a-z]
			})
		: [];

	$: disabledPractices = practices
		? practices
			.filter(({ isVisible }) => Boolean(!isVisible))
			.sort((a, b) => {
				return a.title[$locale] - b.title[$locale]; // Sort practices by localized title [a-z]
			})
		: [];
</script>

<nav
	id="main-menu"
	class="main-nav"
	{...$$restProps}>
	{#if $authorized}
		{#if $isEditingState && !isMainPage}
			<div class="edit-title-wrapper">
				<h2 class="title">{$_(`mainMenu.${pageName}.new`)}:</h2>
				<Button
					color="gray"
					on:click={cancelCreating}>
					{$_('button.cancel')}
				</Button>
			</div>
		{:else}
			<div class="edit-title-wrapper">
				<h2 class="title">{$_('mainMenu.practices')}:</h2>
				<Button
					color="gray"
					href="/practices/create">
					{$_('button.add')}
				</Button>
			</div>
		{/if}
	{:else}
		<h2 class="title">{$_('mainMenu.practices')}:</h2>
	{/if}
	{#if !$isEditingState || ($isEditingState && isMainPage)}
		<ShadowWrapper
			noBottom={practices.length <= 3}
			noTop>
			<ul class="links-list">
				{#each visiblePractices as menuItem}
					<li>
						<a
							class:active={$page.url.pathname.includes(menuItem.slug[$locale])}
							data-sveltekit-keepfocus
							href={`/practices/${menuItem.slug[$locale]}`}
							hreflang={$locale}
						>
							{menuItem.title[$locale]}
						</a>
					</li>
				{/each}
				{#each disabledPractices as menuItem}
					<li>
						<a
							class="disabled"
							class:active={$page.url.pathname.includes(menuItem.slug[$locale])}
							data-sveltekit-keepfocus
							href={`/practices/${menuItem.slug[$locale]}`}
							hreflang={$locale}
						>
							{menuItem.title[$locale]}
						</a>
					</li>
				{/each}
			</ul>
		</ShadowWrapper>
	{/if}
</nav>

<section
	class="contacts no-mobile"
	aria-label="Контакты">
	{#if socialLinks}
		{#each socialLinks as { link, name }}
			<a
				href={link}
				referrerpolicy="no-referrer"
				rel="me"
				target="_blank">
				{name[$locale]}
			</a>
		{/each}
	{/if}
</section>

<style scoped>
	.main-nav {
		display: grid;
		grid-template-rows: max-content minmax(0, 1fr);
		margin-top: 51px;
	}

	@media (width <= 1081px) {
		.main-nav {
			height: 100%;
			margin-top: 25px;
		}
	}

	.main-nav .title {
		margin: 0;
		padding: 0;
		font-size: var(--font-main-menu-heading-size);
		font-weight: var(--font-main-weight);
	}

	.main-nav .links-list::-webkit-scrollbar {
		display: none;
	}

	.main-nav .links-list {
		display: flex;
		flex-direction: column;
		overflow: auto;
		scroll-behavior: smooth;
		scrollbar-width: none;
		list-style: none;
		padding: 0;
		margin: 0;
		row-gap: 15px;
		min-height: 0;
		height: 100%;
	}

	.main-nav .links-list::after {
		content: '';
		display: list-item block;
		height: 5em;
		width: 100%;
		flex-shrink: 0;
	}

	.main-nav .links-list li a {
		text-wrap: balance;
		font-weight: var(--font-menu-weight);
	}

	.main-nav .links-list a.disabled {
		opacity: 0.5;
	}

	.contacts {
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 40px 0;
		flex-wrap: wrap;
		font-weight: var(--font-menu-weight);
	}
	.contacts a {
		font-size: var(--buttons-text-size);
		text-decoration: none;
	}

	.edit-title-wrapper {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
</style>
