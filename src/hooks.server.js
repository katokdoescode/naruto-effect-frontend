import { createSupabaseServerClient } from '$lib/supabaseClient.js';
import { locale } from 'svelte-i18n';

/** Cookies of the old hand-made auth, replaced by @supabase/ssr cookies. */
const LEGACY_AUTH_COOKIES = ['authToken', 'refreshToken'];

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
	const lang = event.request.headers.get('accept-language')?.split(',')[0];
	if (lang) locale.set(lang);

	for (const name of LEGACY_AUTH_COOKIES) {
		if (event.cookies.get(name)) event.cookies.delete(name, { path: '/' });
	}

	event.locals.supabase = createSupabaseServerClient(event.cookies);

	// Verifies the session token (and refreshes it when it has expired)
	const { data, error } = await event.locals.supabase.auth.getClaims();
	event.locals.isAuthenticated = Boolean(data?.claims && !error);

	return resolve(event, {
		filterSerializedResponseHeaders: (name) =>
			name === 'content-range' || name === 'x-supabase-api-version',
	});
};
