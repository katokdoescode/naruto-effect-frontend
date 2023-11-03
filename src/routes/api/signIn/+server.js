import { VITE_BFF_BASE_URL } from '$env/static/private';
import { Routes } from '$lib/constants/index.js';
import { createError } from '$lib/utils/errors.js';
import { FetchData } from '$lib/utils/fetchData.js';
import { validateUserData } from '$lib/utils/validate.js';
import { json } from '@sveltejs/kit';

export async function POST({ cookies, request }) {
	const data = await request.formData();

	const userData = {
		email: data.get('email') || '',
		password: data.get('password') || ''
	};

	if (!validateUserData(userData))
		return json({
			success: false,
			errorMessage: 'Fill the fields'
		});

	const url = VITE_BFF_BASE_URL + Routes.LOGIN;
	// @ts-ignore
	const { authToken } = await fetch(url, new FetchData({ data: userData }));

	if (authToken) {
		cookies.set('authToken', authToken, { path: '/' });
		return json({ success: true });
	} else {
		return json(createError(false, 'Email or password is not correct.'));
	}
}
