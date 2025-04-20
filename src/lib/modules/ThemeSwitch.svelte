<script>
import { browser } from '$app/environment';
import { ColorSchemes } from '$lib/constants';
import { appColorScheme } from '$lib/stores/themeStore';
import { onMount } from 'svelte';
import { _ } from 'svelte-i18n';

/** @type{string | 'light'|'dark'|'auto'} */
let scheme;
let isMounted = false;
const availableSchemes = Object.values(ColorSchemes);

onMount(() => {
	// Get the initial scheme from localStorage or default to auto
	scheme = localStorage.getItem('colorScheme') || ColorSchemes.AUTO;
	isMounted = true;
	updateTheme();
});

function updateTheme() {
	/** @type {HTMLLinkElement} */
	const lightStylesheet = document.querySelector(
		'link[href="/styles/themes/light.css"]',
	);

	/** @type {HTMLLinkElement} */
	const darkStylesheet = document.querySelector(
		'link[href="/styles/themes/dark.css"]',
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
		'(prefers-color-scheme: dark)',
	)?.matches;
	const lightModePreference = window.matchMedia(
		'(prefers-color-scheme: light)',
	)?.matches;

	let prefersColorScheme = null;
	if (darkModePreference) {
		prefersColorScheme = 'dark';
	} else if (lightModePreference) {
		prefersColorScheme = 'light';
	}

	appColorScheme.set(
		scheme === ColorSchemes.AUTO ? prefersColorScheme : scheme,
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
