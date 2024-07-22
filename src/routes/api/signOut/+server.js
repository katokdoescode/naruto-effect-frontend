import { supabase } from '$lib/supabaseClient.js';
import { json } from '@sveltejs/kit';
export async function POST({ cookies }) {
	const { error } = await supabase.auth.signOut();

	if (error) {
		return json({
			success: false,
			errorMessage: error.message,
		});
	}

	cookies.delete('authToken', { path: '/' });
	return json({
		success: true,
	});
}
