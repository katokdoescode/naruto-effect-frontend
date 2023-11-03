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
		display: grid;
		grid-template-rows: max-content minmax(0px, 1fr) max-content;

		min-width: var(--min-right-section-width);
		max-width: var(--max-right-section-width);
		width: 100%;
	}

	.panel-second .controls {
		display: flex;
		justify-content: flex-start;
		column-gap: 40px;
	}

	.panel-second .wrapper {
		font-weight: var(--font-menu-weight);
		padding: 40px 0;
	}

	.panel-second .service-link {
		font-size: (--buttons-text-size);
	}
</style>
