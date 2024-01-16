<script>
	import { _, locale, locales } from 'svelte-i18n';
	export let id;

	function switchLanguage() {
		$locale = $locales[nextLanguageIndex];
	}

	$: nextLanguageIndex =
		($locales.findIndex((value) => $locale === value) + 1) % $locales.length;
</script>

<button
	{id}
	class="language-switch"
	aria-label={$_('switchLanguage')}
	title={$_('switchLanguage')}
	type="button"
	on:click={switchLanguage}>{$locales[nextLanguageIndex]}</button
>

<style scoped>
	.language-switch {
		border: none;
		background-color: transparent;
		text-transform: capitalize;
		cursor: pointer;
		appearance: none;
		font-size: var(--font-main-menu-size);
		font-weight: var(--font-menu-weight);
		margin: 0;
		padding: 0;
		width: 2em;
	}
</style>
