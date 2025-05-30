import { VITE_ADMIN_EMAIL, VITE_NODE_ENV } from '$env/static/private';
import { supabase } from '$lib/supabaseClient.js';
import { createError } from '$lib/utils/errors.js';
import { validateUserData } from '$lib/utils/validate.js';
import { json } from '@sveltejs/kit';

export async function POST({ cookies, request }) {
	const formData = await request.formData();

	const userData = {
		email: VITE_ADMIN_EMAIL || '',
		password: formData.get('password').toString() || '',
	};

	if (!validateUserData(userData)) {
		return json({
			success: false,
			errorMessage: 'Fill the fields',
		});
	}

	const isDev = VITE_NODE_ENV === 'development';

	const {
		data: { session: authToken },
		error,
	} = isDev
		? await supabase.auth.signInAnonymously()
		: await supabase.auth.signInWithPassword(userData);

	if (!error && authToken) {
		console.debug();
		cookies.set('authToken', authToken.access_token, {
			path: '/',
			expires:
				new Date(new Date().getTime() + authToken.expires_at) ||
				new Date(new Date().getTime() + 86500000),
		});

		cookies.set('refreshToken', authToken.refresh_token, {
			path: '/',
			expires:
				new Date(new Date().getTime() + authToken.expires_at) ||
				new Date(new Date().getTime() + 86500000),
		});

		return json({ success: true });
	}
	return json(createError(false, 'Email or password is not correct.'));
}
