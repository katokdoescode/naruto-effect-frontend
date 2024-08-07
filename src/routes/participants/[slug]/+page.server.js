import { Routes } from '$lib/constants';
import { supabase } from '$lib/supabaseClient';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, cookies }) {
	const isAuthenticated = !!cookies.get('authToken');
	const { slug } = params;

	const { data: participant, error: participantError } = await supabase
		.from(Routes.PARTICIPANTS)
		.select()
		.eq('slug', slug)
		.in('isVisible', [true, ...(isAuthenticated ? [false] : [])])
		.limit(1)
		.single();

	const { data: participants, error: participantsError } = await supabase
		.from(Routes.PARTICIPANTS)
		.select('id, isVisible, slug, name')
		.in('isVisible', [true, ...(isAuthenticated ? [false] : [])]);

	if (participantError) throw error(404, participantError.message);
	if (participantsError) console.error('Participants was not loaded');

	return { participant, participants };
}
