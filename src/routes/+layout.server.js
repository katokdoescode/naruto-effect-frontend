export async function load({ cookies, fetch }) {
	const authToken = cookies.get('authToken');
	/** @type { Practices } */
	const { data: practices } = await fetch('/api/practices').then((res) =>
		res.json()
	);

	/** @type { Participants } */
	const { data: participants } = await fetch('/api/participants').then((res) =>
		res.json()
	);

	const data = {
		authorized: !!authToken,
		practices,
		participants
	};

	return data;
}
