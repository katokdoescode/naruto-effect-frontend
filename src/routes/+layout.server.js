import { error } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies, fetch }) {
	const authToken = cookies.get('authToken');

	/** @type { {data: Practices} } */
	const { data: practices } = await fetch('/api/practices').then((res) =>
		res.json()
	);

	/** @type { {data: Participants} } */
	const { data: participants } = await fetch('/api/participants').then((res) =>
		res.json()
	);

	const {
		data: pageData,
		success,
		errorMessage
	} = await fetch('/api/mainPage').then((res) => res.json());

	if (!success) error(500, errorMessage);

	const data = {
		authorized: !!authToken,
		practices,
		participants,
		pageData
	};

	return data;
}
