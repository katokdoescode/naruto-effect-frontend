/**
 * Validate cv
 *
 * @param {CvData} cv
 * @param {string} locale
 * @returns {boolean}
 */
export function validateCv(cv, locale) {
	if (!cv.title[locale]) return false;
	if (!cv.text[locale]) return false;

	return true;
}
