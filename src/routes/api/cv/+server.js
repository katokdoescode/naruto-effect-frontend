import { VITE_BFF_BASE_URL } from '$env/static/private';
import { Routes } from '$lib/constants';
import { createError } from '$lib/utils/errors';
import { json } from '@sveltejs/kit';

export async function GET() {
	const url = VITE_BFF_BASE_URL + Routes.CV;
	const pageData = await fetch(url).then((res) => res.json());

	if (pageData?.length) {
		return json({ success: true, data: pageData[0] });
	} else {
		return json(createError(false, 'Something went wrong. Try again later.'));
	}
}