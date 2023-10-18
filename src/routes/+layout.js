import { locale, waitLocale } from 'svelte-i18n';
import { browser } from '$app/environment';
import '$lib/i18n';

export async function load() {
	if (browser) locale.set(window.navigator.language);
	await waitLocale();
}
