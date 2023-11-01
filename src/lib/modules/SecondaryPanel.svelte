<script lang="ts">
	import LangSwitch from '$lib/modules/LangSwitch.svelte';
	import SecondNav from '$lib/modules/SecondNav.svelte';
	import ThemeSwitch from '$lib/modules/ThemeSwitch.svelte';

	export let participants = [];
</script>

<aside id="panel-second" class="panel">
	<div class="service-link">
		<LangSwitch id="change-lang-panel-second" />
		<ThemeSwitch />
	</div>

	<SecondNav {participants} />

	<a href="/" class="service-link">Принять участие</a>
</aside>

<style>
	#panel-second {
		flex: 1 1 var(--min-right-section-width);
		padding: 0 0 0 var(--sections-padding);
		max-width: var(--max-right-section-width);
		min-width: var(--min-right-section-width);

		display: grid;
		grid-template-rows: max-content minmax(0px, 1fr) max-content;
		padding-top: calc(var(--initial-padding-top) + 10px);
		padding-bottom: 38px;
	}

	@media (width <= 1018px) {
		#panel-second {
			padding-bottom: 66px;
		}
	}

	.service-link {
		font-size: var(--font-panel-second-menu-size);
		text-decoration: none;
	}

	@media (width <=1018px) {
		.service-link {
			display: none;
		}
	}
</style>
