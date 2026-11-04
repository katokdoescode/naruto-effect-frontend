const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 30; // 30 days, in seconds

/**
 * Saves Supabase session tokens into cookies.
 *
 * @param {import('@sveltejs/kit').Cookies} cookies
 * @param {import('@supabase/supabase-js').Session} session
 */
export function setAuthCookies(cookies, session) {
	const accessTokenExpires = session.expires_at
		? new Date(session.expires_at * 1000)
		: new Date(Date.now() + (session.expires_in || 3600) * 1000);

	cookies.set('authToken', session.access_token, {
		path: '/',
		expires: accessTokenExpires,
	});

	cookies.set('refreshToken', session.refresh_token, {
		path: '/',
		maxAge: REFRESH_TOKEN_MAX_AGE,
	});
}

/**
 * @param {import('@sveltejs/kit').Cookies} cookies
 */
export function clearAuthCookies(cookies) {
	cookies.delete('authToken', { path: '/' });
	cookies.delete('refreshToken', { path: '/' });
}
