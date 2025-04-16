import { supabase } from '$lib/supabaseClient';
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
		} = await supabase.auth.refreshSession({
			refresh_token: refreshToken,
		});

		if (error) {
			cookies.delete('authToken', { path: '/' });
			cookies.delete('refreshToken', { path: '/' });
			return json(createError(false, 'Failed to refresh token'));
		}

		if (session) {
			const expiresAt = new Date(new Date().getTime() + session.expires_at);

			cookies.set('authToken', session.access_token, {
				path: '/',
				expires: expiresAt,
			});

			cookies.set('refreshToken', session.refresh_token, {
				path: '/',
				expires: expiresAt,
			});

			return json({ success: true });
		}
	} catch (error) {
		console.error('Error refreshing token:', error);
		return json(createError(false, 'Server error during token refresh'));
	}
}
