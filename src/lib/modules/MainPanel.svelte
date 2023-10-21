<script>
	import MainNav from '$lib/modules/MainNav.svelte';
	import Burger from '$lib/ui/Burger.svelte';
	import { _ } from 'svelte-i18n';
	import LangSwitch from './LangSwitch.svelte';

	export let practices;

	$: isMenuOpened = false;

	function updateMenuState(event) {
		const { detail } = event;
		isMenuOpened = detail;
	}
</script>

<header
	id="panel-main"
	class="main-section__item main-section__left"
	data-menu-is-opened={isMenuOpened}
>
	<div id="logo">
		<a href="/">{$_('narutoEffect')}</a>
		<Burger on:change={updateMenuState} />
	</div>

	<MainNav {practices} {isMenuOpened} />

	<section class="contacts" aria-label="Контакты">
		<a href="https://www.youtube.com/@narutoeffect" target="_blank"
			>YouTube ЭН</a
		>
		<LangSwitch id="change-lang" />
		<a href="https://t.me/narutoeffect" target="_blank">Телеграм ЭН</a>
	</section>
</header>

<style>
	#panel-main {
		--appear-delay: 0.13s;
		--appear-timing: 0.3s;
		--appear-transition: opacity var(--appear-timing) ease-in-out
			var(--appear-delay);

		display: grid;
		grid-template-rows: max-content minmax(0, 1fr) max-content;
		padding-top: var(--initial-padding-top);
		max-height: calc(100svh - var(--initial-padding-top));
		z-index: 1;
	}

	@media (width <=1018px) {
		#panel-main {
			background-color: var(--color-bg-main);
			width: 100%;
			position: fixed;
			transition: max-height var(--appear-timing) ease-in-out;
		}

		#panel-main[data-menu-is-opened='false'],
		#panel-main:has(.checkbox:not(:checked)) {
			position: fixed;
			max-height: var(--left-section-span-height);
			overflow: hidden;
		}

		@supports not selector(:has(*)) {
			#panel-main:not([data-menu-is-opened]) {
				position: fixed;
				max-height: var(--left-section-span-height);
				overflow: hidden;
			}
		}
	}

	@media (width >= 1018px) {
		:global(#change-lang) {
			display: none;
		}
	}

	#logo {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	#logo a {
		font-weight: 800;
		font-size: 30px;
		line-height: 38px;
		text-decoration: none;
	}

	#panel-main .contacts {
		box-sizing: border-box;
		padding: 35px 0;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	@media (width <=1018px) {
		#panel-main .contacts {
			transition: var(--appear-transition);
			height: 90px;
			bottom: 0;
		}
	}

	@media (width <= 1018px) {
		#panel-main[data-menu-is-opened='false'] #panel-main .contacts,
		#panel-main:has(.checkbox:not(:checked)) #panel-main .contacts {
			visibility: hidden;
			opacity: 0;
		}

		#panel-main[data-menu-is-opened='true'] #panel-main .contacts,
		#panel-main:has(.checkbox:checked) #panel-main .contacts {
			opacity: 1;
		}
	}

	#panel-main .contacts a {
		font-size: var(--font-second-menu-size);
		text-decoration: none;
	}
</style>
