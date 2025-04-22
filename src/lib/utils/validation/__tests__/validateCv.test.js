import { describe, expect, it } from 'vitest';
import { validateCv } from '../validateCv';
import { locales, validCv } from './testData';

describe('validateCv', () => {
	it('should return true for valid CV', () => {
		expect(validateCv(validCv, locales.ru)).toBe(true);
		expect(validateCv(validCv, locales.en)).toBe(true);
	});

	it('should return false if title is missing', () => {
		const invalidCv = {
			...validCv,
			title: { ru: '', en: 'CV' },
		};
		expect(validateCv(invalidCv, locales.ru)).toBe(false);
	});

	it('should return false if text is missing', () => {
		const invalidCv = {
			...validCv,
			text: { ru: 'Текст резюме', en: '' },
		};
		expect(validateCv(invalidCv, locales.en)).toBe(false);
	});
});
