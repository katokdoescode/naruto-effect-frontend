<script>
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
		noBottom={participants.length <= 2}
		noTop={participants.length <= 2}
	>
		<ul class="list">
			{#each participants as menuItem}
				<li>
					<a href={`/participants/${menuItem.slug}`}>{menuItem.name[lang]}</a>
				</li>
			{/each}
		</ul>
	</ShadowWrapper>
</nav>

<style>
	.second-nav {
		display: flex;
		flex-direction: column;
		gap: 15px;
		padding-top: clamp(60px, 17.5svh, 175px);
	}

	@media (width <=1018px) {
		.second-nav {
			padding-top: 40px;
		}
	}

	.second-nav .title {
		margin: 0;
		padding: 0;
		font-size: var(--font-panel-second-menu-heading-size);
		font-weight: var(--font-main-weight);
	}

	.second-nav .list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding-bottom: 80px;
		box-sizing: border-box;
		height: auto;
		overflow: auto;
		scroll-behavior: smooth;
		scrollbar-width: none;
		position: relative;
	}

	.second-nav::after {
		pointer-events: none;
		content: '';
		display: block;
		position: absolute;
		max-width: var(--max-panel-second-section-width);
		width: 100%;
		height: 114px;
		bottom: 94px;
		background: linear-gradient(
			to bottom,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 0) 0.01%,
			var(--color-bg-main)
		);
	}

	.second-nav .list li {
		margin: 0;
		font-size: var(--font-panel-second-menu-size);
		font-weight: var(--font-menu-weight);
	}
</style>
