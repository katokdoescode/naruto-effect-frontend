import { VITE_BFF_BASE_URL } from '$env/static/private';
import { Routes } from '$lib/constants';
import { createError } from '$lib/utils/errors';
import { json } from '@sveltejs/kit';

export async function GET() {
	const url = VITE_BFF_BASE_URL + Routes.PARTICIPANTS;

	/** @type {Participants} */
	const participants = await fetch(url).then((res) => res.json());

	if (participants) {
		return json({ success: true, data: participants });
	} else {
		return json(createError(false, 'Something went wrong. Try again later.'));
	}
}
