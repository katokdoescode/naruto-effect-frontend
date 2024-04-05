import isLinkActive from './isLinkActive';
import { describe, it, expect } from 'vitest';

describe('isLinkActive function', () => {
	it('returns true when the last pathname item is equal to the slug', () => {
		expect(
			isLinkActive('/pathname/of/my-name-is-vasya', 'my-name-is-vasya')
		).toBe(true);
	});

	it('returns false when the last pathname item is not equal to the slug', () => {
		expect(isLinkActive('/pathname/of/not-my-name', 'my-name-is-vasya')).toBe(
			false
		);
	});

	it('handles pathnames with trailing slashes', () => {
		expect(
			isLinkActive('/pathname/of/my-name-is-vasya/', 'my-name-is-vasya')
		).toBe(true);
	});

	it('handles empty slug', () => {
		expect(isLinkActive('/pathname/of/something', '')).toBe(false);
	});

	it('handles slug that appears in the middle of the pathname', () => {
		expect(
			isLinkActive(
				'/pathname/my-name-is-vasya/of/something',
				'my-name-is-vasya'
			)
		).toBe(false);
	});

	it('returns false when both pathname and slug are empty', () => {
		expect(isLinkActive('', '')).toBe(false);
	});

	it('handles slug with special characters', () => {
		expect(isLinkActive('/pathname/of/%C3%A9l%C3%A9phant', 'éléphant')).toBe(
			true
		);
	});

	it('handles pathname with query parameters or fragments', () => {
		expect(isLinkActive('/pathname/of/name?query=param#fragment', 'name')).toBe(
			true
		);
	});
});
