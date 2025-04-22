/** @type {import('./$types').PageServerLoad} */
export async function load({ parent }) {
	const parentData = await parent();
	/** @type{MainPageData} */
	const pageData = parentData.pageData;

	return { pageData };
}
