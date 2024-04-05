/**
 * Check if the last pathname item is equal to the slug name
 *
 * @param {string} pathname
 * @param {string} slug
 * @returns {boolean}
 */
export default function (pathname, slug) {
	if (pathname === '' && slug === '') return false;
	const cleanPathname = pathname.split('?')[0].split('#')[0].replace(/\/$/, '');
	const lastPathItem = cleanPathname.split('/').pop();
	const decodedLastPathItem = decodeURIComponent(lastPathItem);
	const decodedSlug = decodeURIComponent(slug);
	return decodedLastPathItem === decodedSlug;
}
