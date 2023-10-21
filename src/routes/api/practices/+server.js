import { NODE_ENV, VITE_BFF_BASE_URL } from '$env/static/private';
import { AppError, Routes } from '@/lib/constants/index.js';
import { json } from '@sveltejs/kit';
import practicesMock from './mock.json';

export async function GET() {
	/**
	 * @type {any[] | Response}
	 */
	let practices = [];

	if (NODE_ENV === 'development') {
		practices = practicesMock;
	} else {
		const url = VITE_BFF_BASE_URL + Routes.PRACTICES;
		practices = await fetch(url);
	}

	if (practices) {
		return json({ success: true, data: practices });
	} else {
		return json(new AppError(false, 'Something went wrong. Try again later.'));
	}
}
