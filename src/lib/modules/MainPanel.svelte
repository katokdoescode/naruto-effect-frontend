<script>
	import MainNav from '$lib/modules/MainNav.svelte';
	import Burger from '$lib/ui/Burger.svelte';
	import { _ } from 'svelte-i18n';
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
</header>

<style>
	#panel-main {
		--initial-padding-top: 50px;
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
			padding-left: 15px;
			padding-right: 15px;
			box-sizing: border-box;
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

	@media (width <= 1018px) {
		:global(
				#panel-main[data-menu-is-opened='false'] .main-nav .contacts,
				#panel-main:has(.checkbox:not(:checked)) .main-nav .contacts
			) {
			visibility: hidden;
			opacity: 0;
		}

		:global(
				#panel-main[data-menu-is-opened='true'] .main-nav .contacts,
				#panel-main:has(.checkbox:checked) .main-nav .contacts
			) {
			opacity: 1;
		}
	}
</style>
