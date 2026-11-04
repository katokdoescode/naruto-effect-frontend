import { json } from '@sveltejs/kit';

export async function POST({ locals }) {
	// `local` ends only this device's session: editors share one admin account
	const { error } = await locals.supabase.auth.signOut({ scope: 'local' });
	if (error) console.error('Error signing out:', error.message);

	return json({ success: true });
}
