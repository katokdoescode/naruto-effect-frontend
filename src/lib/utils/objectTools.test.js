import { describe, expect, test } from 'vitest';
import { clean, pick } from './objectsTools';

/**
 * Removes keys from an object that have undesirable values.
 *
 * @param {Object} sourceObject - The original object.
 * @param {Array} [undesiredValues=[undefined, null, NaN]] - Array of undesirable values.
 * @returns {Object} An object without keys having the undesirable values.
 */
// export function clean(sourceObject, undesiredValues = [undefined, null, Number.NaN]) {
// 	const result = { ...sourceObject };

// 	for (const key in result) {
// 		if (undesiredValues.includes(result[key])) {
// 			delete result[key];
// 		}
// 	}

// 	return result;
// }

/**
 * Like lodash pick
 * @param {object} object - Source object
 * @param {string[]} keys - Keys to pick
 * @returns {object}
 */
// export const pick = (object, keys) =>
// 	keys.reduce((obj, key) => {
// 		if (Object.prototype.hasOwnProperty.call(object, key)) {
// 			obj[key] = object[key];
// 		}
// 		return obj;
// 	}, {});

describe('clean function', () => {
	test('removes keys with undefined values', () => {
		const sourceObject = {
			name: 'John',
			age: 30,
			address: undefined,
		};

		const result = clean(sourceObject);
		expect(result).toEqual({ name: 'John', age: 30 });
	});

	test('removes keys with null values', () => {
		const sourceObject = {
			name: 'Alice',
			age: 25,
			job: null,
		};

		const result = clean(sourceObject);
		expect(result).toEqual({ name: 'Alice', age: 25 });
	});

	test('removes keys with NaN values', () => {
		const sourceObject = {
			name: 'Bob',
			age: Number.NaN,
			city: 'New York',
		};

		const result = clean(sourceObject);
		expect(result).toEqual({ name: 'Bob', city: 'New York' });
	});
});

describe('pick function', () => {
	test('picks specified keys from object', () => {
		const sourceObject = {
			name: 'Alice',
			age: 25,
			job: 'Engineer',
		};

		const result = pick(sourceObject, ['name', 'job']);
		expect(result).toEqual({ name: 'Alice', job: 'Engineer' });
	});
});
