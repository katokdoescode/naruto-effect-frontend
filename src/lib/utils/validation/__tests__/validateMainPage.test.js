import { describe, expect, it } from 'vitest';
import { validateMainPage } from '../validateMainPage';
import { locales, validMainPage } from './testData';

describe('validateMainPage', () => {
	it('should return true for valid main page', () => {
		expect(validateMainPage(validMainPage, locales.ru)).toBe(true);
		expect(validateMainPage(validMainPage, locales.en)).toBe(true);
	});

	it('should return false if title is missing', () => {
		const invalidMainPage = {
			...validMainPage,
			title: { ru: '', en: 'Title' },
		};
		expect(validateMainPage(invalidMainPage, locales.ru)).toBe(false);
	});

	it('should return false if text is missing', () => {
		const invalidMainPage = {
			...validMainPage,
			text: { ru: 'Текст', en: '' },
		};
		expect(validateMainPage(invalidMainPage, locales.en)).toBe(false);
	});

	it('should return false if banner.link exists without banner.alt', () => {
		const invalidMainPage = {
			...validMainPage,
			banner: {
				link: 'https://example.com/image.jpg',
				alt: '',
			},
		};
		expect(validateMainPage(invalidMainPage, locales.ru)).toBe(false);
	});

	it('should return false if banner.alt exists without banner.link', () => {
		const invalidMainPage = {
			...validMainPage,
			banner: {
				link: '',
				alt: 'Banner',
			},
		};
		expect(validateMainPage(invalidMainPage, locales.ru)).toBe(false);
	});

	it('should return true if banner is completely missing', () => {
		const mainPageWithoutBanner = {
			...validMainPage,
			banner: {
				link: '',
				alt: '',
			},
		};
		expect(validateMainPage(mainPageWithoutBanner, locales.ru)).toBe(true);
	});
});
