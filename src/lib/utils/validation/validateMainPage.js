/**
 * Validate main page
 *
 * @param {MainPageData} mainPage
 * @param {string} locale
 * @returns {boolean}
 */
export function validateMainPage(mainPage, locale) {
	if (!mainPage.title[locale]) return false;
	if (!mainPage.text[locale]) return false;
	if (mainPage.banner.link || mainPage.banner.alt) {
		if (!mainPage.banner.link || !mainPage.banner.alt) return false;
	}

	return true;
}
