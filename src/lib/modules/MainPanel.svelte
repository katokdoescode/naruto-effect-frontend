<script>
import Logo from '$lib/modules/Logo.svelte';
import MainNav from '$lib/modules/MainNav.svelte';
import { _ } from 'svelte-i18n';
export let practices = [];
export let pageLinks = [];
</script>

<header
	id="panel-main"
	class="panel no-mobile">
	<div id="logo">
		<Logo />
	</div>

	<MainNav
		aria-label={$_('mainMenu.practices')}
		{pageLinks}
		{practices} />
</header>

<style>
	#panel-main {
		flex: 1;
		display: grid;
		grid-template-rows: max-content minmax(0, 1fr) max-content;
		min-width: var(--min-left-section-width);
		max-width: var(--max-left-section-width);
		width: 100%;
	}
</style>
