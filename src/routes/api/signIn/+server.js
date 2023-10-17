import { json } from '@sveltejs/kit';
import { auth } from '@/api/auth.js';
import { VITE_BFF_BASE_URL } from '$env/static/private';

export async function POST({ cookies, request, fetch }) {
	const data = await request.formData();

	const userData = {
		email: data.get('email'),
		password: data.get('password')
	};

	function validate() {
		return Object.values(userData).every((field) => field);
	}

	if (!validate()) {
		return json({
			success: false,
			errorMessage: 'Fill the fields'
		});
	}

	const { authToken } = await auth(userData, fetch, VITE_BFF_BASE_URL);

	if (authToken) {
		cookies.set('authToken', authToken, { path: '/' });
		return json({ success: true });
	} else {
		return json({
			success: false,
			errorMessage: 'Email or password is not correct.'
		});
	}
}
