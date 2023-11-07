import { browser } from '$app/environment';
import '$lib/i18n';
import { appLocales } from '$lib/i18n';
import matchLocale from '$lib/utils/matchLocale';
import { locale, waitLocale } from 'svelte-i18n';

export async function load() {
	if (browser)
		locale.set(
			matchLocale(appLocales, window.navigator.language?.split('-')[0])
		);
	await waitLocale();
}
