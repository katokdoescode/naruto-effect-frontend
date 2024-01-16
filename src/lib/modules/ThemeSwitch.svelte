<script>
	import { browser } from '$app/environment';
	import { ColorSchemes } from '$lib/constants';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	import { getContext } from 'svelte';

	let scheme;
	let isMounted = false;
	const availableSchemes = Object.values(ColorSchemes);

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

	$: if (scheme && browser && isMounted) updateTheme();
</script>

<select
	class="theme-switch"
	bind:value={scheme}>
	{#each availableSchemes as availableScheme}
		<option value={availableScheme}>{$_(`scheme.${availableScheme}`)}</option>
	{/each}
</select>

<style scoped>
	.theme-switch {
		border: none;
		background-color: transparent;
		text-transform: capitalize;
		cursor: pointer;
		appearance: none;
		font-size: var(--font-main-menu-size);
		font-weight: var(--font-menu-weight);
		margin: 0;
		padding: 0;
		width: max-content;
	}
</style>
