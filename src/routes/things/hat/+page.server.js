import { Routes } from '$lib/constants';
import { supabase } from '$lib/supabaseClient';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	/** @type {SupabaseHats} */
	const { data: hats, error: hatError } = await supabase
		.from(Routes.HAT)
		.select('id, isPutting, name, words, createdAt');

	if (hatError) {
		console.error('Some data was not loaded:');
		console.error('practices', hatError.message);
	}

	const data = {
		hats,
	};

	return data;
}
