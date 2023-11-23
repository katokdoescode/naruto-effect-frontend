import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, fetch, cookies }) {
	const isAuthenticated = !!cookies.get('authToken');
	const { slug } = params;

	/** @type {{data: Participant}&AppErrorType} */
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
	if (!participant?.isVisible && !isAuthenticated)
		throw error(404, 'Participant not found');

	return { participant, participants };
}
