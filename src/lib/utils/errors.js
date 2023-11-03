/**
 *
 * @param {boolean} success
 * @param {string} errorMessage
 * @returns {AppErrorType}
 */
export function createError(success, errorMessage) {
	return {
		success,
		errorMessage,
		data: undefined
	};
}
