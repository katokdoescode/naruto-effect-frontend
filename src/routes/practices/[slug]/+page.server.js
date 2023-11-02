export async function load({ params, fetch }) {
	const { slug } = params;

	/** @type { {data: Practice} } */
	const { data: practice } = await fetch('/api/practices/' + slug).then((res) =>
		res.json()
	);

	return { practice };
}
