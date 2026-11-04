import { clearAuthCookies, setAuthCookies } from '$lib/server/authCookies.js';
import { createSupabaseClient } from '$lib/supabaseClient';
import { createError } from '$lib/utils/errors';
import { json } from '@sveltejs/kit';

export async function POST({ cookies }) {
	const refreshToken = cookies.get('refreshToken');

	if (!refreshToken) {
		return json(createError(false, 'No refresh token provided'));
	}

	try {
		const {
			data: { session },
			error,
		} = await createSupabaseClient().auth.refreshSession({
			refresh_token: refreshToken,
		});

		if (error) {
			clearAuthCookies(cookies);
			return json(createError(false, 'Failed to refresh token'));
		}

		if (session) {
			setAuthCookies(cookies, session);
			return json({ success: true });
		}
	} catch (error) {
		console.error('Error refreshing token:', error);
		return json(createError(false, 'Server error during token refresh'));
	}
}
