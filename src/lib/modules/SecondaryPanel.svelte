<script lang="ts">
	import LangSwitch from '$lib/modules/LangSwitch.svelte';
	import SecondNav from '$lib/modules/SecondNav.svelte';
	import ThemeSwitch from '$lib/modules/ThemeSwitch.svelte';

	export let participants = [];
</script>

<aside
	id="panel-second"
	class="panel no-mobile">
	<div class="service-link">
		<LangSwitch id="change-lang-panel-second" />
		<ThemeSwitch />
	</div>

	<SecondNav {participants} />

	<a
		class="service-link"
		href="/">Принять участие</a>
</aside>

<style>
	#panel-second {
		background-color: rgba(100, 100, 100, 0.2);
		display: grid;
		grid-template-rows: max-content minmax(0px, 1fr) max-content;
	}
</style>
