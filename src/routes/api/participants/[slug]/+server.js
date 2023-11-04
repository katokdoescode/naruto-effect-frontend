import { VITE_BFF_BASE_URL } from '$env/static/private';
import { Routes } from '$lib/constants/index.js';
import { createError } from '$lib/utils/errors.js';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const { slug } = params;
	const url = VITE_BFF_BASE_URL + Routes.PARTICIPANTS + '/' + slug;
	const response = await fetch(url).then((res) => res.json());

	if (
		response?.status === 'error' ||
		response?.code === 'ERROR_CODE_INPUT_ERROR'
	) {
		return json(createError(false, response.message));
	}

	/** @type {Participant} */
	const participant = response;

	if (participant) {
		return json({ success: true, data: participant });
	} else {
		return json(createError(false, 'Something went wrong. Try again later.'));
	}
}
