<script>
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { ColorSchemes } from '$lib/constants';

	let scheme = null;

	onMount(() => {
		// Get the initial scheme from localStorage or default to auto
		scheme = localStorage.getItem('color-scheme') || 'auto';

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

		if (scheme === 'auto') {
			lightStylesheet.media = '(prefers-color-scheme: light)';
			darkStylesheet.media = '(prefers-color-scheme: dark)';
		} else if (scheme === 'light') {
			lightStylesheet.media = 'all';
			darkStylesheet.media = 'not all';
		} else if (scheme === 'dark') {
			lightStylesheet.media = 'not all';
			darkStylesheet.media = 'all';
		}

		localStorage.setItem('color-scheme', scheme);
	}

	function switchNextTheme() {
		const availableSchemes = Object.values(ColorSchemes).filter(
			(s) => s !== scheme
		);
		scheme = availableSchemes[0];
	}

	$: if (scheme) updateTheme();
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
	<label for="light" aria-label={$_('btnLight')} title={$_('btnLight')}>
		🌕
	</label>

	<input
		id="auto"
		type="radio"
		name="color-scheme"
		value="auto"
		bind:group={scheme}
	/>
	<label for="auto" aria-label={$_('btnAuto')} title={$_('btnAuto')}>
		🌗
	</label>

	<input
		id="dark"
		type="radio"
		name="color-scheme"
		value="dark"
		bind:group={scheme}
	/>
	<label for="dark" aria-label={$_('btnDark')} title={$_('btnDark')}>
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
