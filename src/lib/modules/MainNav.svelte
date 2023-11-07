<script>
	import { page } from '$app/stores';
	import ShadowWrapper from '$lib/modules/ShadowWrapper.svelte';

	import { _, locale } from 'svelte-i18n';
	export let practices = [];
	export let socialLinks = [];
	let lang;

	locale.subscribe((l) => (lang = l));
</script>

<nav
	id="main-menu"
	class="main-nav"
	{...$$restProps}>
	<h2 class="title">{$_('mainMenu.practices')}:</h2>
	<ShadowWrapper
		noBottom={practices.length <= 3}
		noTop>
		<ul class="links-list">
			{#each practices as menuItem}
				<li>
					<a
						class:active={$page.url.pathname.includes(menuItem.slug[lang])}
						data-sveltekit-keepfocus
						href={`/practices/${menuItem.slug[lang]}`}
						hreflang={lang}
					>
						{menuItem.name[lang]}
					</a>
				</li>
			{/each}
		</ul>
	</ShadowWrapper>
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
				{name[lang]}
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
</style>
