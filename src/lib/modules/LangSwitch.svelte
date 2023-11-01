<script>
	import { locale, locales } from 'svelte-i18n';
	export let id;
</script>

<select
	{id}
	bind:value={$locale}>
	{#each $locales as locale}
		<option value={locale}>{locale}</option>
	{/each}
</select>
