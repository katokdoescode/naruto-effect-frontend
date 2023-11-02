export async function load({ parent, fetch }) {
	const parentData = await parent();
	/** @type{MainPageData} */
	const pageData = parentData.pageData;

	/** @type { {data: Participants} } */
	const { data: participants } = await fetch('/api/participants').then((res) =>
		res.json()
	);

	return { pageData, participants };
}
