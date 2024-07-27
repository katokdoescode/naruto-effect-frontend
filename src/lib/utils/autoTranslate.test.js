import { describe, expect, it } from 'vitest';
import autoTranslate from './autoTranslate';

describe('Translates', () => {
	it('latin to cyrillic', () => {
		expect(autoTranslate('ru', 'hello')).toBe('Хелло');
	});

	it('cyrillic to latin', () => {
		expect(autoTranslate('en', 'Обычная практика без перевода')).toBe(
			'Obychnaya Praktika Bez Perevoda',
		);
	});
});
