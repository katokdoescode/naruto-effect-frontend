<script>
	import ShadowWrapper from '$lib/modules/ShadowWrapper.svelte';
	import { _, locale } from 'svelte-i18n';
	export let participants = [];
	let lang;

	locale.subscribe((l) => (lang = l));
</script>

<nav class="second-nav">
	<h2 class="title">{$_('mainMenu.participants')}:</h2>
	<ShadowWrapper
		noTop={participants.length <= 2}
		noBottom={participants.length <= 2}
	>
		<ul class="list">
			{#each participants as menuItem}
				<li>
					<a href={`participants/${menuItem.slug}`}>{menuItem.name[lang]}</a>
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
		padding-top: clamp(60px, 12svh, 140px);
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
		bottom: 57px;
		background: linear-gradient(
			to bottom,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 0) 0.01%,
			#ffffff 100%
		);
	}

	.second-nav .list li {
		margin: 0;
		font-size: var(--font-panel-second-menu-size);
	}
</style>
