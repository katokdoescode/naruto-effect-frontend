import { VITE_BFF_BASE_URL } from '$env/static/private';
import { AppError, Routes } from '$lib/constants';
import { json } from '@sveltejs/kit';

export async function GET() {
	const url = VITE_BFF_BASE_URL + Routes.MAIN_PAGE;
	const [pageData] = await fetch(url).then((res) => res.json());

	if (pageData) {
		return json({ success: true, data: pageData });
	} else {
		return json(new AppError(false, 'Something went wrong. Try again later.'));
	}
}
