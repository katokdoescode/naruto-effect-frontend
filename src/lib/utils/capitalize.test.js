import { describe, expect, it } from 'vitest';

import capitalize from './capitalize';

describe('capitalize', () => {
	it('capitalizes the first letter of a single word', () => {
		expect(capitalize('hello')).toBe('Hello');
	});

	it('capitalizes the first letters of each word in a sentence', () => {
		expect(capitalize('hello world! this is a test.')).toBe(
			'Hello World! This Is A Test.',
		);
	});

	it('leaves uppercase words unchanged except the first letter', () => {
		expect(capitalize('HELLO WORLD!')).toBe('HELLO WORLD!');
	});

	it('handles empty strings without error', () => {
		expect(capitalize('')).toBe('');
	});

	it('handles strings with multiple spaces correctly', () => {
		expect(capitalize('hello   world!  this   is a test.')).toBe(
			'Hello   World!  This   Is A Test.',
		);
	});

	it('preserves the original case of all letters except the first of each word', () => {
		expect(capitalize('hElLo wOrLd!')).toBe('HElLo WOrLd!');
	});
});
