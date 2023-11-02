<script>
	import Logo from '$lib/modules/Logo.svelte';
	import MainNav from '$lib/modules/MainNav.svelte';
	export let practices;
	export let socialLinks;
</script>

<header
	id="panel-main"
	class="panel no-mobile">
	<div id="logo">
		<Logo />
	</div>

	<MainNav
		{practices}
		{socialLinks} />
</header>

<style>
	#panel-main {
		display: grid;
		grid-template-rows: max-content minmax(0, 1fr) max-content;
		min-width: var(--min-left-section-width);
		max-width: var(--max-left-section-width);
		width: 100%;
	}
</style>
