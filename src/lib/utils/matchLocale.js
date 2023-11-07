export default function (locales, locale) {
	if (Array.isArray(locales)) return locales.includes(locale) ? locale : 'en';
	else if (typeof locales === 'object')
		return Object.values(locales).includes(locale) ? locale : 'en';
}
