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

export async function POST({ request, cookies }) {
	/** @type {Practice} */
	const data = await request.json();
	const authToken = cookies.get('authToken');
	const url = VITE_BFF_BASE_URL + Routes.PRACTICES;

	const requestOptions = {
		method: 'POST',
		headers: {
			Authorization: authToken,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	};

	/** @type {Practice&XanoError} */
	const practice = await fetch(url, requestOptions).then((res) => res.json());

	if (practice.message) {
		return json(createError(false, practice.message));
	}

	if (practice) {
		return json({ success: true, data: practice });
	} else {
		return json(createError(false, 'Something went wrong. Try again later.'));
	}
}
export async function PATCH({ request, cookies }) {
	/** @type {Practice} */
	const data = await request.json();
	const authToken = cookies.get('authToken');
	const url = VITE_BFF_BASE_URL + Routes.PRACTICES + `/${data.id}`;

	const requestOptions = {
		method: 'PATCH',
		headers: {
			Authorization: authToken,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	};

	/** @type {Practice&XanoError} */
	const practice = await fetch(url, requestOptions).then((res) => res.json());

	if (practice.message) {
		return json(createError(false, practice.message));
	}

	if (practice) {
		return json({ success: true, data: practice });
	} else {
		return json(createError(false, 'Something went wrong. Try again later.'));
	}
}
