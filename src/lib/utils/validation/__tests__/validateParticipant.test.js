import { describe, expect, it } from 'vitest';
import { validateParticipant } from '../validateParticipant';
import { locales, validParticipant } from './testData';

describe('validateParticipant', () => {
	it('should return true for valid participant', () => {
		expect(validateParticipant(validParticipant, locales.ru)).toBe(true);
		expect(validateParticipant(validParticipant, locales.en)).toBe(true);
	});

	it('should return false if name is missing', () => {
		const invalidParticipant = {
			...validParticipant,
			name: { ru: '', en: 'Participant' },
		};
		expect(validateParticipant(invalidParticipant, locales.ru)).toBe(false);
	});

	it('should return false if description is missing', () => {
		const invalidParticipant = {
			...validParticipant,
			description: { ru: 'Описание', en: '' },
		};
		expect(validateParticipant(invalidParticipant, locales.en)).toBe(false);
	});
});
