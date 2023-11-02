<script>
	import { locale, locales } from 'svelte-i18n';
	export let id;
</script>

<select
	{id}
	class="language-switch"
	bind:value={$locale}>
	{#each $locales as locale}
		<option value={locale}>{locale}</option>
	{/each}
</select>

<style scoped>
	.language-switch {
		border: none;
		background-color: transparent;
		text-transform: capitalize;
		cursor: pointer;
		appearance: none;
		font-size: var(--font-size-main);
		font-weight: var(--font-menu-weight);
		margin: 0;
		padding: 0;
		width: 2em;
	}
</style>
