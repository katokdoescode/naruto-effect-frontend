import { browser } from '$app/environment';
import matchLocale from '$lib/utils/matchLocale';
import { init, register } from 'svelte-i18n';

const defaultLocale = 'en';

export const appLocales = ['en', 'ru'];

appLocales.forEach((locale) =>
	register(locale, () => import(`./locales/${locale}.json`)),
);

init({
	fallbackLocale: defaultLocale,
	initialLocale: browser
		? matchLocale(appLocales, window.navigator.language?.split('-')[0])
		: defaultLocale,
});
