<script>
	import Logo from '$lib/modules/Logo.svelte';
	import MainNav from '$lib/modules/MainNav.svelte';
	export let practices;
</script>

<header id="panel-main" class="panel no-mobile">
	<div id="logo">
		<Logo />
	</div>

	<MainNav {practices} />
</header>

<style>
	#panel-main {
		background-color: rgba(100, 255, 100, 0.2);
		display: grid;
		grid-template-rows: max-content minmax(0, 1fr) max-content;
		min-width: var(--min-left-section-width);
		max-width: var(--max-left-section-width);
		width: 100%;
	}
</style>
