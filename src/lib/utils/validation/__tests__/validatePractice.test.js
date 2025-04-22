import { describe, expect, it } from 'vitest';
import { validatePractice } from '../validatePractice';
import { locales, validPractice } from './testData';

describe('validatePractice', () => {
	it('should return true for valid practice', () => {
		expect(validatePractice(validPractice, locales.ru)).toBe(true);
		expect(validatePractice(validPractice, locales.en)).toBe(true);
	});

	it('should return false if title is missing', () => {
		const invalidPractice = {
			...validPractice,
			title: { ru: '', en: 'Practice' },
		};
		expect(validatePractice(invalidPractice, locales.ru)).toBe(false);
	});

	it('should return false if description is missing', () => {
		const invalidPractice = {
			...validPractice,
			description: { ru: 'Описание', en: '' },
		};
		expect(validatePractice(invalidPractice, locales.en)).toBe(false);
	});

	it('should return false if banner.link exists without banner.alt', () => {
		const invalidPractice = {
			...validPractice,
			banner: {
				link: 'https://example.com/practice.jpg',
				alt: '',
			},
		};
		expect(validatePractice(invalidPractice, locales.ru)).toBe(false);
	});

	it('should return false if banner.alt exists without banner.link', () => {
		const invalidPractice = {
			...validPractice,
			banner: {
				link: '',
				alt: 'Practice Banner',
			},
		};
		expect(validatePractice(invalidPractice, locales.ru)).toBe(false);
	});

	it('should return true if banner is completely missing', () => {
		const practiceWithoutBanner = {
			...validPractice,
			banner: {
				link: '',
				alt: '',
			},
		};
		expect(validatePractice(practiceWithoutBanner, locales.ru)).toBe(true);
	});
});
