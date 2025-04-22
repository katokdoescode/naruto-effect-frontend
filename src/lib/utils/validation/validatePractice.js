/**
 * Validate practice
 *
 * @param {Practice} practice
 * @param {string} locale
 * @returns {boolean}
 */
export function validatePractice(practice, locale) {
	if (!practice.title[locale] || !practice.description[locale]) return false;

	if (practice.banner.link || practice.banner.alt) {
		if (!practice.banner.link || !practice.banner.alt) return false;
	}

	return true;
}
