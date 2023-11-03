import { VITE_BFF_BASE_URL } from '$env/static/private';
import { Routes } from '$lib/constants/index.js';
import { createError } from '$lib/utils/errors.js';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const { slug } = params;
	const url = VITE_BFF_BASE_URL + Routes.PRACTICES + '/' + slug;

	const multiResponse = await fetch(url).then((res) => res.json());

	if (multiResponse?.status === 'error') {
		return json(createError(false, multiResponse.message));
	}

	/** @type {Practice} */
	const practice = Object.values(multiResponse).find((x) => x) || undefined;

	if (practice) {
		return json({ success: true, data: practice });
	} else {
		return json(createError(false, 'Something went wrong. Try again later.'));
	}
}
