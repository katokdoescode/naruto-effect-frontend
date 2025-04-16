import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { deleteCookie, getCookie } from '$lib/utils/cookies';

export async function refreshSession() {
	if (!browser) return;

	const refreshToken = getCookie('refreshToken');
	if (!refreshToken) return;

	try {
		const response = await fetch('/api/refreshToken', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();

		if (!data.success) {
			deleteCookie('authToken');
			deleteCookie('refreshToken');
			goto('/login');
		}
	} catch (error) {
		console.error('Error refreshing session:', error);
		deleteCookie('authToken');
		deleteCookie('refreshToken');
		goto('/login');
	}
}

export function setupTokenRefresh() {
	if (!browser) return;
	const interval = setInterval(refreshSession, 4 * 60 * 1000);
	return () => clearInterval(interval);
}
