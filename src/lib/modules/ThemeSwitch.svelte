<script>
	import { browser } from '$app/environment';
	import { ColorSchemes } from '$lib/constants';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	let scheme;
	let isMounted = false;
	const availableSchemes = Object.values(ColorSchemes);
	$: schemeId = availableSchemes.findIndex((s) => s === scheme);

	onMount(() => {
		// Get the initial scheme from localStorage or default to auto
		scheme = localStorage.getItem('color-scheme') || ColorSchemes.AUTO;
		isMounted = true;
		updateTheme();
	});

	function updateTheme() {
		/** @type {HTMLLinkElement} */
		const lightStylesheet = document.querySelector(
			'link[href="styles/themes/light.css"]'
		);

		/** @type {HTMLLinkElement} */
		const darkStylesheet = document.querySelector(
			'link[href="styles/themes/dark.css"]'
		);

		if (scheme === ColorSchemes.AUTO) {
			lightStylesheet.media = '(prefers-color-scheme: light)';
			darkStylesheet.media = '(prefers-color-scheme: dark)';
		} else if (scheme === ColorSchemes.LIGHT) {
			lightStylesheet.media = 'all';
			darkStylesheet.media = 'not all';
		} else if (scheme === ColorSchemes.DARK) {
			lightStylesheet.media = 'not all';
			darkStylesheet.media = 'all';
		}

		localStorage.setItem('color-scheme', scheme);
	}

	function switchNextTheme() {
		if (schemeId === -1) return;
		const newSchemeId =
			schemeId >= availableSchemes.length - 1 ? 0 : schemeId + 1;
		scheme = availableSchemes[newSchemeId];
	}

	$: if (scheme && browser && isMounted) updateTheme();
</script>

<fieldset class="vh">
	<legend>{$_('legend')}</legend>
	<input
		id="light"
		type="radio"
		name="color-scheme"
		value="light"
		bind:group={scheme}
	/>
	<label for="light" aria-label={$_('scheme.light')} title={$_('scheme.light')}>
		🌕
	</label>

	<input
		id="auto"
		type="radio"
		name="color-scheme"
		value="auto"
		bind:group={scheme}
	/>
	<label for="auto" aria-label={$_('scheme.auto')} title={$_('scheme.auto')}>
		🌗
	</label>

	<input
		id="dark"
		type="radio"
		name="color-scheme"
		value="dark"
		bind:group={scheme}
	/>
	<label for="dark" aria-label={$_('scheme.dark')} title={$_('scheme.dark')}>
		🌑
	</label>
</fieldset>

<button
	type="button"
	on:click={switchNextTheme}
	aria-label={$_('changeColorScheme')}
>
	{$_(`scheme.${scheme}`)}
</button>
