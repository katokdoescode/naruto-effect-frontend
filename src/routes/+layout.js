import { browser } from '$app/environment';
import '$lib/i18n';
import { locale, waitLocale } from 'svelte-i18n';

/** @type {import('./$types').LayoutLoad} */
export async function load({ data }) {
	if (browser) locale.set(data.locale);

	// Loads the messages before rendering, so the locale can be set synchronously
	await waitLocale(data.locale);

	return data;
}
