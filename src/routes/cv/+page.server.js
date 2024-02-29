import { Routes } from '$lib/constants';
import { supabase } from '$lib/supabaseClient';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const { data: cvData, error: cvError } = await supabase
		.from(Routes.CV)
		.select()
		.limit(1)
		.single();

	if (cvError) throw error(404, cvError.message);

	return { cvData };
}
