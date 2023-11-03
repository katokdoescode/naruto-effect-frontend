import { VITE_BFF_BASE_URL } from '$env/static/private';
import { Routes } from '$lib/constants/index.js';
import { createError } from '$lib/utils/errors';
import { json } from '@sveltejs/kit';

export async function GET() {
	const url = VITE_BFF_BASE_URL + Routes.PRACTICES;

	/** @type {Practices} **/
	const practices = await fetch(url).then((res) => res.json());

	if (practices) {
		return json({ success: true, data: practices });
	} else {
		return json(createError(false, 'Something went wrong. Try again later.'));
	}
}
