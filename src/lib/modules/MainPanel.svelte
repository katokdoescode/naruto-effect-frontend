<script>
	import MainNav from '$lib/modules/MainNav.svelte';
	import { _ } from 'svelte-i18n';
	export let practices;
</script>

<header id="panel-main" class="panel">
	<div id="logo">
		<a href="/">{$_('narutoEffect')}</a>
	</div>

	<MainNav {practices} />
</header>

<style>
	#panel-main {
		background-color: rgba(100, 255, 100, 0.2);
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
</style>
