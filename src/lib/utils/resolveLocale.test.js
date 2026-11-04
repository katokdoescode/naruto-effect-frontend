import { describe, expect, it } from 'vitest';
import { resolveLocale } from './resolveLocale';

const locales = ['en', 'ru'];

describe('resolveLocale', () => {
	it('uses the locale from the cookie first', () => {
		expect(resolveLocale(locales, 'en', 'ru-RU,ru;q=0.9')).toBe('en');
	});

	it('ignores an unsupported cookie locale', () => {
		expect(resolveLocale(locales, 'de', 'ru-RU,ru;q=0.9')).toBe('ru');
	});

	it('takes the first supported browser language', () => {
		expect(resolveLocale(locales, null, 'de-DE,de;q=0.9,ru;q=0.8')).toBe('ru');
	});

	it('matches a language with a region', () => {
		expect(resolveLocale(locales, undefined, 'RU-ru')).toBe('ru');
	});

	it('falls back to the default locale', () => {
		expect(resolveLocale(locales, null, 'fr-FR')).toBe('en');
		expect(resolveLocale(locales, null, null)).toBe('en');
	});
});
