import { supabase } from '$lib/supabaseClient.js';
import { locale } from 'svelte-i18n';

export const handle = async ({ event, resolve }) => {
	const lang = event.request.headers.get('accept-language')?.split(',')[0];
	if (lang) locale.set(lang);

	const authToken = event.cookies.get('authToken');
	const refreshToken = event.cookies.get('refreshToken');

	if (!authToken && refreshToken) {
		try {
			const {
				data: { session },
				error,
			} = await supabase.auth.refreshSession({
				refresh_token: refreshToken,
			});

			if (error) {
				event.cookies.delete('authToken', { path: '/' });
				event.cookies.delete('refreshToken', { path: '/' });
			} else if (session) {
				event.cookies.set('authToken', session.access_token, {
					path: '/',
					expires: new Date(new Date().getTime() + session.expires_at),
				});

				event.cookies.set('refreshToken', session.refresh_token, {
					path: '/',
					expires: new Date(new Date().getTime() + session.expires_at),
				});
			}
		} catch (error) {
			console.error('Error refreshing token:', error);
			event.cookies.delete('authToken', { path: '/' });
			event.cookies.delete('refreshToken', { path: '/' });
		}
	}

	return resolve(event);
};
