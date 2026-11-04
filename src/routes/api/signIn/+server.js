import { VITE_ADMIN_EMAIL, VITE_NODE_ENV } from '$env/static/private';
import { setAuthCookies } from '$lib/server/authCookies.js';
import { createSupabaseClient } from '$lib/supabaseClient.js';
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
	const supabase = createSupabaseClient();

	const {
		data: { session: authToken },
		error,
	} = isDev
		? await supabase.auth.signInAnonymously()
		: await supabase.auth.signInWithPassword(userData);

	if (!error && authToken) {
		setAuthCookies(cookies, authToken);
		return json({ success: true });
	}
	return json(createError(false, 'Email or password is not correct.'));
}
