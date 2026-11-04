import { Routes } from '$lib/constants';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const { supabase } = locals;
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
