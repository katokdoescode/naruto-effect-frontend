/**
 * Validates uer data
 * @param {{email: string | FormDataEntryValue, password: string | FormDataEntryValue}} userData
 * @returns {boolean} - is data valid or not
 */
export function validateUserData(userData) {
	return Object.values(userData).every((field) => field);
}
