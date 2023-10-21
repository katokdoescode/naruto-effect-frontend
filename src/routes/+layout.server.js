export async function load({ cookies, fetch }) {
	const authToken = cookies.get('authToken');
	const { data: practices } = await fetch('/api/practices').then((res) =>
		res.json()
	);

	const data = {
		authorized: !!authToken,
		practices
	};

	return data;
}
