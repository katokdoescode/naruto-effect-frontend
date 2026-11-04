import { clearAuthCookies } from '$lib/server/authCookies.js';
import { createSupabaseClient } from '$lib/supabaseClient.js';
import { json } from '@sveltejs/kit';

export async function POST({ cookies }) {
	const accessToken = cookies.get('authToken');

	if (accessToken) {
		const { error } =
			await createSupabaseClient().auth.admin.signOut(accessToken);
		if (error) console.error('Error signing out:', error.message);
	}

	clearAuthCookies(cookies);

	return json({
		success: true,
	});
}
