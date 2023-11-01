<script lang="ts">
	import LangSwitch from '$lib/modules/LangSwitch.svelte';
	import SecondNav from '$lib/modules/SecondNav.svelte';
	import ThemeSwitch from '$lib/modules/ThemeSwitch.svelte';
	import { _ } from 'svelte-i18n';

	export let participants = [];
	export let participateLink = null;
</script>

<aside
	id="panel-second"
	class="panel panel-second no-mobile">
	<div class="controls">
		<ThemeSwitch />
		<LangSwitch id="change-lang-panel-second" />
	</div>

	<SecondNav {participants} />

	<div class="wrapper">
		<a
			class="service-link"
			href={participateLink}>{$_('participate')}</a>
	</div>
</aside>

<style>
	#panel-second {
		background-color: rgba(100, 100, 100, 0.2);
		display: grid;
		grid-template-rows: max-content minmax(0px, 1fr) max-content;
		min-width: 130px;
	}

	.panel-second .controls {
		display: flex;
		justify-content: space-between;
	}

	.panel-second .wrapper {
		font-weight: var(--font-menu-weight);
		padding: 40px 0;
	}
</style>
