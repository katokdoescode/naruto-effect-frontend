/**
 * Check for link
 * @param {string} string
 */
export default function parseLink(string) {
	try {
		return new URL(string).href;
	} catch {
		return '';
	}
}
