import {
	createBrowserClient,
	createServerClient,
	isBrowser,
} from '@supabase/ssr';

const SUPABASE_URL = import.meta.env.VITE_BFF_SUPABASE_URL;

/**
 * Publishable key (`sb_publishable_…`).
 * Falls back to the legacy anon key until the env var is replaced.
 */
const SUPABASE_KEY =
	import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
	import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY;

export const STORAGE_BUCKET = import.meta.env.VITE_SUPABASE_BUCKET;

/** @type {import('@supabase/supabase-js').SupabaseClient|undefined} */
let browserClient;

/**
 * Supabase client for the browser.
 * The session lives in cookies, so the server sees the same session.
 *
 * On the server use `event.locals.supabase` instead.
 */
export function getSupabase() {
	if (!isBrowser()) {
		throw new Error(
			'getSupabase() works only in the browser, use locals.supabase on the server',
		);
	}

	browserClient ??= createBrowserClient(SUPABASE_URL, SUPABASE_KEY);
	return browserClient;
}

/**
 * Supabase client for one server request. Reads and writes the session cookies.
 *
 * @param {import('@sveltejs/kit').Cookies} cookies
 */
export function createSupabaseServerClient(cookies) {
	return createServerClient(SUPABASE_URL, SUPABASE_KEY, {
		cookies: {
			getAll: () => cookies.getAll(),
			setAll: (cookiesToSet) => {
				for (const { name, value, options } of cookiesToSet) {
					cookies.set(name, value, { ...options, path: '/' });
				}
			},
		},
	});
}
