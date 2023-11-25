<script>
	import { browser } from '$app/environment';
	import { ColorSchemes } from '$lib/constants';
	import Button from '$lib/ui/Button.svelte';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	import { getContext } from 'svelte';

	let scheme;
	let isMounted = false;
	const availableSchemes = Object.values(ColorSchemes);
	$: schemeId = availableSchemes.findIndex((s) => s === scheme);

	const appColorScheme = getContext('appColorScheme');

	onMount(() => {
		// Get the initial scheme from localStorage or default to auto
		scheme = localStorage.getItem('colorScheme') || ColorSchemes.AUTO;
		isMounted = true;
		updateTheme();
	});

	function updateTheme() {
		/** @type {HTMLLinkElement} */
		const lightStylesheet = document.querySelector(
			'link[href="/styles/themes/light.css"]'
		);

		/** @type {HTMLLinkElement} */
		const darkStylesheet = document.querySelector(
			'link[href="/styles/themes/dark.css"]'
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

		localStorage.setItem('colorScheme', scheme);
		const darkModePreference = window.matchMedia(
			'(prefers-color-scheme: dark)'
		);
		const lightModePreference = window.matchMedia(
			'(prefers-color-scheme: light)'
		);
		const prefersColorScheme = darkModePreference
			? 'dark'
			: lightModePreference
			? 'light'
			: null;
		appColorScheme.set(
			scheme === ColorSchemes.AUTO ? prefersColorScheme : scheme
		);
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
	<legend>{$_('scheme.legend')}</legend>
	<input
		id="light"
		name="colorScheme"
		type="radio"
		value="light"
		bind:group={scheme}
	/>
	<label
		aria-label={$_('scheme.light')}
		for="light"
		title={$_('scheme.light')}
	/>

	<input
		id="auto"
		name="colorScheme"
		type="radio"
		value="auto"
		bind:group={scheme}
	/>
	<label
		aria-label={$_('scheme.auto')}
		for="auto"
		title={$_('scheme.auto')} />

	<input
		id="dark"
		name="colorScheme"
		type="radio"
		value="dark"
		bind:group={scheme}
	/>
	<label
		aria-label={$_('scheme.dark')}
		for="dark"
		title={$_('scheme.dark')} />
</fieldset>

<Button
	aria-label={$_('changeColorScheme')}
	on:click={switchNextTheme}>
	{$_(`scheme.${scheme}`)}
</Button>
