import { VITE_BFF_BASE_URL } from '$env/static/private';
import { AppError, Routes } from '$lib/constants/index.js';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const { slug } = params;
	const url = VITE_BFF_BASE_URL + Routes.PRACTICES + '/' + slug;

	/** @type {Practice} **/
	const multiResponse = await fetch(url).then((res) => res.json());
	const practice = Object.values(multiResponse).find((x) => x) || undefined;

	if (practice) {
		return json({ success: true, data: practice });
	} else {
		return json(new AppError(false, 'Something went wrong. Try again later.'));
	}
}
