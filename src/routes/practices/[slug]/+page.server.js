import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, fetch, cookies }) {
	const isAuthenticated = !!cookies.get('authToken');

	const { slug } = params;

	/** @type{{data: Practice}&AppErrorType} */
	const res = await fetch('/api/practices/' + slug).then((res) => res.json());

	/** @type {Practice} */
	const practice = res.data;

	if (!practice) throw error(404, res.errorMessage);
	if (!practice?.isVisible && !isAuthenticated)
		throw error(404, 'Practice not found');

	return { practice };
}
