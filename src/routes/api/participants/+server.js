import { NODE_ENV, VITE_BFF_BASE_URL } from '$env/static/private';
import { AppError, Routes } from '@/lib/constants/index.js';
import { json } from '@sveltejs/kit';
import participantsMock from './mock.json';

export async function GET() {
	/**
	 * @type {any[] | Response}
	 */
	let participants = [];

	if (NODE_ENV === 'development') {
		participants = participantsMock;
	} else {
		const url = VITE_BFF_BASE_URL + Routes.participants;
		participants = await fetch(url);
	}

	if (participants) {
		return json({ success: true, data: participants });
	} else {
		return json(new AppError(false, 'Something went wrong. Try again later.'));
	}
}
