/**
 * Validate project
 *
 * @param {Project} project
 * @param {string} locale
 * @returns {boolean}
 */
export function validateProject(project, locale) {
	if (
		!project.name[locale] ||
		!project.title[locale] ||
		!project.description[locale]
	)
		return false;

	return true;
}
