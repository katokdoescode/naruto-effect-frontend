import { error } from '@sveltejs/kit';
import { FetchData } from '@/lib/utils/fetchData.js';
import { Routes } from '@/lib/constants/index.js';
import { VITE_BFF_BASE_URL } from '$env/static/private';

export async function load({ cookies }) {
	const url = VITE_BFF_BASE_URL + Routes.USER;
	const token = cookies.get('authToken');
	const user = await fetch(url, new FetchData({ token }));

	if (!user) throw error(404);

	return {
		user
	};
}
