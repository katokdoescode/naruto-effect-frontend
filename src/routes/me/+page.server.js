import { error } from '@sveltejs/kit';
import { getUser } from '@/api/user.js';

export async function load({ cookies, fetch }) {
	const token = cookies.get('authToken');
	const user = await getUser(token, fetch);

	if (!user) throw error(404);

	return {
		user
	};
}
