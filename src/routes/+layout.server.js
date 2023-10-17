export function load({ cookies }) {
	const authToken = cookies.get('authToken');

	if (authToken)
		return {
			authorized: true
		};
}
