import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, fetch }) {
	const { slug } = params;

	const res = await fetch('/api/participants/' + slug).then((res) =>
		res.json()
	);

	/** @type { {data: Participants} } */
	const { data: participants } = await fetch('/api/participants').then((res) =>
		res.json()
	);

	/** @type {Participant} */
	const participant = res.data;
	if (!participant) throw error(404, res.errorMessage);
	return { participant, participants };
}
