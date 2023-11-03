import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, fetch }) {
	const { slug } = params;

	const res = await fetch('/api/practices/' + slug).then((res) => res.json());

	const practice = res.data;
	if (!practice) throw error(404, res.errorMessage);
	return { practice };
}
