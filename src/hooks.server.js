import { clearAuthCookies, setAuthCookies } from '$lib/server/authCookies.js';
import { createSupabaseClient } from '$lib/supabaseClient.js';
import { json } from '@sveltejs/kit';
import { locale } from 'svelte-i18n';

/** API routes where only the admin may change data. */
const ADMIN_API_ROUTES = [
	'/api/practices',
	'/api/projects',
	'/api/participants',
	'/api/mainPage',
	'/api/cv',
	'/api/files',
];

const READ_METHODS = ['GET', 'HEAD', 'OPTIONS'];

/**
 * Finds a valid session for the current request:
 * checks the access token and refreshes it with the refresh token if needed.
 *
 * @param {import('@sveltejs/kit').Cookies} cookies
 * @returns {Promise<{ accessToken: string|null, user: import('@supabase/supabase-js').User|null }>}
 */
async function resolveSession(cookies) {
	const accessToken = cookies.get('authToken');
	const refreshToken = cookies.get('refreshToken');

	if (!accessToken && !refreshToken) return { accessToken: null, user: null };

	const authClient = createSupabaseClient();

	try {
		if (accessToken) {
			const {
				data: { user },
				error,
			} = await authClient.auth.getUser(accessToken);

			if (user && !error) return { accessToken, user };
		}

		if (refreshToken) {
			const {
				data: { session },
				error,
			} = await authClient.auth.refreshSession({
				refresh_token: refreshToken,
			});

			if (session && !error) {
				setAuthCookies(cookies, session);
				return { accessToken: session.access_token, user: session.user };
			}
		}
	} catch (error) {
		console.error('Error resolving session:', error);
	}

	clearAuthCookies(cookies);
	return { accessToken: null, user: null };
}

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
	const lang = event.request.headers.get('accept-language')?.split(',')[0];
	if (lang) locale.set(lang);

	const { accessToken, user } = await resolveSession(event.cookies);

	event.locals.user = user;
	event.locals.isAuthenticated = Boolean(user);
	event.locals.supabase = createSupabaseClient(accessToken);

	const { pathname } = event.url;
	const isAdminRoute = ADMIN_API_ROUTES.some(
		(route) => pathname === route || pathname.startsWith(`${route}/`),
	);

	if (
		isAdminRoute &&
		!READ_METHODS.includes(event.request.method) &&
		!event.locals.isAuthenticated
	) {
		return json(
			{ success: false, errorMessage: 'Not authorized', data: undefined },
			{ status: 401 },
		);
	}

	return resolve(event);
};
