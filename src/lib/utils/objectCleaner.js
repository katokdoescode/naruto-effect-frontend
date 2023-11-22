/**
 * Removes keys from an object that have undesirable values.
 *
 * @param {Object} sourceObject - The original object.
 * @param {Array} [undesiredValues=[undefined, null, NaN]] - Array of undesirable values.
 * @returns {Object} An object without keys having the undesirable values.
 */
export function clean(sourceObject, undesiredValues = [undefined, null, NaN]) {
	const result = { ...sourceObject };

	for (const key in result) {
		if (undesiredValues.includes(result[key])) {
			delete result[key];
		}
	}

	return result;
}
