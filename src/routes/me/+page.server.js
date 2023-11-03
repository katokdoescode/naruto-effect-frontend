import { VITE_BFF_BASE_URL } from '$env/static/private';
import { Routes } from '$lib/constants/index.js';
import { FetchData } from '$lib/utils/fetchData.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	const url = VITE_BFF_BASE_URL + Routes.USER;
	const token = cookies.get('authToken');
	const user = await fetch(url, new FetchData({ token }));

	if (!user) throw error(404);

	return {
		user
	};
}
