<script>
	import ShadowWrapper from '$lib/modules/ShadowWrapper.svelte';
	import LangSwitch from './LangSwitch.svelte';

	import { _, locale } from 'svelte-i18n';
	export let isMenuOpened = false;
	export let practices = [];
	let lang;

	locale.subscribe((l) => (lang = l));
</script>

<nav class={`main-nav ${isMenuOpened ? '' : 'closed'}`}>
	<h2 class="title">{$_('mainMenu.practices')}:</h2>
	<ShadowWrapper noTop={practices.length <= 2} noBottom={practices.length <= 2}>
		<ul class="links-list">
			{#each practices as menuItem}
				<li>
					<a href={`practices/${menuItem.slug[lang]}`} hreflang={lang}>
						{menuItem.name[lang]}
					</a>
				</li>
			{/each}
		</ul>
	</ShadowWrapper>

	<section class="contacts" aria-label="Контакты">
		<a href="https://www.youtube.com/@narutoeffect" target="_blank"
			>YouTube ЭН</a
		>
		<LangSwitch id="change-lang" />
		<a href="https://t.me/narutoeffect" target="_blank">Телеграм ЭН</a>
	</section>
</nav>

<style>
	.main-nav {
		display: grid;
		grid-template-rows: max-content minmax(0, 1fr);
	}

	@media (width <=1018px) {
		.main-nav {
			transition: var(--appear-transition);
			opacity: 1;
			visibility: visible;
		}

		.main-nav.closed {
			visibility: hidden;
			opacity: 0;
			height: 0;
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
		height: auto;
		overflow: auto;
		scroll-behavior: smooth;
		scrollbar-width: none;
	}

	.main-nav .links-list::after {
		content: '';
		display: block;
	}

	.main-nav .links-list li a {
		text-wrap: balance;
	}

	.contacts {
		box-sizing: border-box;
		padding: 35px 0;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	@media (width <=1018px) {
		.contacts {
			transition: var(--appear-transition);
			height: 90px;
			bottom: 0;
		}
	}

	.contacts a {
		font-size: var(--font-second-menu-size);
		text-decoration: none;
	}
</style>
