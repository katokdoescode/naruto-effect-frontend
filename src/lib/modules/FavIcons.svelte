<script>
	import { ColorSchemes } from '$lib/constants';
	import { locale } from 'svelte-i18n';
	$: formattedLocale = $locale.split('-').length
		? $locale.split('-')[0]
		: $locale;
</script>

<svelte:head>
	<link
		href={`/ne-${formattedLocale}-${ColorSchemes.DARK}.svg`}
		media="(prefers-color-scheme: light)"
		rel="icon"
	/>
	<link
		href={`/ne-${formattedLocale}-${ColorSchemes.LIGHT}.svg`}
		media="(prefers-color-scheme: dark)"
		rel="icon"
	/>
</svelte:head>
