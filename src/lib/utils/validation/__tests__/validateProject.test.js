import { describe, expect, it } from 'vitest';
import { validateProject } from '../validateProject';
import { locales, validProject } from './testData';

describe('validateProject', () => {
	it('should return true for valid project', () => {
		expect(validateProject(validProject, locales.ru)).toBe(true);
		expect(validateProject(validProject, locales.en)).toBe(true);
	});

	it('should return false if name is missing', () => {
		const invalidProject = {
			...validProject,
			name: { ru: '', en: 'Project' },
		};
		expect(validateProject(invalidProject, locales.ru)).toBe(false);
	});

	it('should return false if title is missing', () => {
		const invalidProject = {
			...validProject,
			title: { ru: 'Заголовок', en: '' },
		};
		expect(validateProject(invalidProject, locales.en)).toBe(false);
	});

	it('should return false if description is missing', () => {
		const invalidProject = {
			...validProject,
			description: { ru: '', en: '' },
		};
		expect(validateProject(invalidProject, locales.ru)).toBe(false);
		expect(validateProject(invalidProject, locales.en)).toBe(false);
	});
});
