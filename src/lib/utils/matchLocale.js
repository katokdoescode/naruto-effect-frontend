/**
 * @param {string | ArrayLike<any> | { [s: string]: any; }} locales
 * @param {any} locale
 */
export default function (locales, locale) {
	if (Array.isArray(locales)) return locales.includes(locale) ? locale : 'en';
	if (typeof locales === 'object')
		return Object.values(locales).includes(locale) ? locale : 'en';
}
