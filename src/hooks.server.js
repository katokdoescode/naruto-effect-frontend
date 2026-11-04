import { appLocales } from '$lib/i18n';
import { createSupabaseServerClient } from '$lib/supabaseClient.js';
import { resolveLocale } from '$lib/utils/resolveLocale.js';

/** Cookies of the old hand-made auth, replaced by @supabase/ssr cookies. */
const LEGACY_AUTH_COOKIES = ['authToken', 'refreshToken'];

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
	// The locale store of svelte-i18n is shared by all requests on the server,
	// so it is set right before rendering (+layout.svelte), not here
	event.locals.locale = resolveLocale(
		appLocales,
		event.cookies.get('lang'),
		event.request.headers.get('accept-language'),
	);

	for (const name of LEGACY_AUTH_COOKIES) {
		if (event.cookies.get(name)) event.cookies.delete(name, { path: '/' });
	}

	event.locals.supabase = createSupabaseServerClient(event.cookies);

	// Verifies the session token (and refreshes it when it has expired)
	const { data, error } = await event.locals.supabase.auth.getClaims();
	event.locals.isAuthenticated = Boolean(data?.claims && !error);

	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('%lang%', event.locals.locale),
		filterSerializedResponseHeaders: (name) =>
			name === 'content-range' || name === 'x-supabase-api-version',
	});
};
