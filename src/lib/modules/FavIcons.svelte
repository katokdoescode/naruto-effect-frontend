<script>
	import { ColorSchemes } from '$lib/constants';
	import { locale } from 'svelte-i18n';
</script>

<svelte:head>
	<link
		href={`/ne-${$locale}-${ColorSchemes.DARK}.svg`}
		media="(prefers-color-scheme: light)"
		rel="icon"
	/>
	<link
		href={`/ne-${$locale}-${ColorSchemes.LIGHT}.svg`}
		media="(prefers-color-scheme: dark)"
		rel="icon"
	/>
</svelte:head>
