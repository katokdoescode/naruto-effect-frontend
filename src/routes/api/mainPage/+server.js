import { VITE_BFF_BASE_URL } from '$env/static/private';
import { Routes } from '$lib/constants';
import { createError } from '$lib/utils/errors';
import { json } from '@sveltejs/kit';

export async function GET() {
	const url = VITE_BFF_BASE_URL + Routes.MAIN_PAGE;
	const pageData = await fetch(url).then((res) => res.json());

	if (pageData?.length) {
		return json({ success: true, data: pageData[0] });
	} else {
		return json(createError(false, 'Something went wrong. Try again later.'));
	}
}

export async function PATCH({ request, cookies }) {
	/** @type {MainPageData} */
	const data = await request.json();
	const authToken = cookies.get('authToken');
	const url = VITE_BFF_BASE_URL + Routes.MAIN_PAGE + `/${data.id}`;

	const requestOptions = {
		method: 'PATCH',
		headers: {
			Authorization: authToken,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	};

	/** @type {MainPageData&XanoError} */
	const pageData = await fetch(url, requestOptions).then((res) => res.json());

	if (pageData.message) {
		return json(createError(false, pageData.message));
	}

	if (pageData) {
		return json({ success: true, data: pageData });
	} else {
		return json(createError(false, 'Something went wrong. Try again later.'));
	}
}
