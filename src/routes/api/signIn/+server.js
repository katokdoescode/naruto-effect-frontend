import { VITE_ADMIN_EMAIL } from '$env/static/private';
import { supabase } from '$lib/supabaseClient.js';
import { createError } from '$lib/utils/errors.js';
import { validateUserData } from '$lib/utils/validate.js';
import { json } from '@sveltejs/kit';

export async function POST({ cookies, request }) {
	const formData = await request.formData();

	const userData = {
		email: VITE_ADMIN_EMAIL || 'a@a.com',
		password: formData.get('password').toString() || 'asd'
	};

	if (!validateUserData(userData)) {
		return json({
			success: false,
			errorMessage: 'Fill the fields'
		});
	}

	const { data, error } = await supabase.auth.signInWithPassword(userData);
	const { session: authToken } = data;

	if (error || !authToken) {
		return json(createError(false, 'Email or password is not correct.'));
	} else {
		cookies.set('authToken', authToken.access_token, { path: '/' });
		return json({ success: true });
	}
}
