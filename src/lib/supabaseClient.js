import { createClient } from '@supabase/supabase-js';

/**
 * Creates a new Supabase client for a single server request.
 *
 * The client never stores a session in memory: every request gets its own
 * client, and the user's access token (from the `authToken` cookie) is sent
 * explicitly. Without a token the client acts as `anon`.
 *
 * Never share one client between requests: a session stored in a shared
 * client would be used for requests of other visitors.
 *
 * @param {string|null} [accessToken]
 */
export function createSupabaseClient(accessToken) {
	return createClient(
		import.meta.env.VITE_BFF_SUPABASE_URL,
		import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY,
		{
			auth: {
				persistSession: false,
				autoRefreshToken: false,
				detectSessionInUrl: false,
			},
			global: accessToken
				? { headers: { Authorization: `Bearer ${accessToken}` } }
				: {},
		},
	);
}
