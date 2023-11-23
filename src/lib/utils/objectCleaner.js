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

/**
 * Like lodash pick
 * @param {object} object - Source object
 * @param {string[]} keys - Keys to pick
 * @returns {object}
 */
export const pick = (object, keys) =>
	keys.reduce((obj, key) => {
		if (Object.prototype.hasOwnProperty.call(object, key)) {
			obj[key] = object[key];
		}
		return obj;
	}, {});
