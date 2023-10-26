import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
	const {
		data: pageData,
		success,
		errorMessage
	} = await fetch('/api/mainPage').then((res) => res.json());

	if (!success) error(500, errorMessage);
	return { pageData };
}
