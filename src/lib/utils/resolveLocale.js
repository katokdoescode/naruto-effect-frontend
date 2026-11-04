/**
 * Picks the locale for a request: the language the visitor chose (cookie),
 * then the browser languages (Accept-Language), then the default one.
 *
 * @param {string[]} appLocales - supported locales, e.g. ['en', 'ru']
 * @param {string|undefined|null} cookieLocale - value of the `lang` cookie
 * @param {string|undefined|null} acceptLanguage - Accept-Language header
 * @param {string} [defaultLocale]
 * @returns {string}
 */
export function resolveLocale(
	appLocales,
	cookieLocale,
	acceptLanguage,
	defaultLocale = 'en',
) {
	if (cookieLocale && appLocales.includes(cookieLocale)) return cookieLocale;

	for (const part of (acceptLanguage || '').split(',')) {
		const language = part.split(';')[0].trim().toLowerCase().split('-')[0];
		if (appLocales.includes(language)) return language;
	}

	return defaultLocale;
}
