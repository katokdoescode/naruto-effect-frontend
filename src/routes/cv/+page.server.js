/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
	/** @type { {data: CvData} } */
	const { data: cvData } = await fetch('/api/cv').then((res) => res.json());

	/** @type { {data: Participants} } */
	const { data: participants } = await fetch('/api/participants').then((res) =>
		res.json()
	);

	return { cvData, participants };
}
