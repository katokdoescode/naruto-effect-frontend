<script>
	import { page } from '$app/stores';
	import ShadowWrapper from '$lib/modules/ShadowWrapper.svelte';
	import { _, locale } from 'svelte-i18n';
	export let participants = [];
	let lang;

	locale.subscribe((l) => (lang = l));
</script>

<nav
	id="second-menu"
	class="second-nav"
	{...$$restProps}>
	<h2 class="title">{$_('mainMenu.participants')}:</h2>
	<ShadowWrapper
		noBottom={participants.length <= 3}
		noTop>
		<ul class="list">
			{#each participants as menuItem}
				<li>
					<a
						class:active={$page.url.pathname.includes(menuItem.slug)}
						href={`/participants/${menuItem.slug}`}>{menuItem.name[lang]}</a
					>
				</li>
			{/each}
		</ul>
	</ShadowWrapper>
</nav>

<style>
	.second-nav {
		display: flex;
		flex-direction: column;
		padding-top: clamp(60px, 17.5svh, 175px);
	}

	@media (width <=1018px) {
		.second-nav {
			height: 100%;
			padding-top: 40px;
		}
	}

	.second-nav .title {
		margin: 0;
		padding: 0;
		font-size: var(--font-second-menu-heading-size);
		font-weight: var(--font-main-weight);
	}

	.second-nav .list {
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
		padding-bottom: 80px;
	}

	.second-nav .list li {
		margin: 0;
		font-size: var(--font-panel-second-menu-size);
		font-weight: var(--font-menu-weight);
	}
</style>
