import { Routes } from '$lib/constants';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
	const { supabase } = locals;
	const { id } = params;
	/** @type {SupabaseHatData} */
	const { data: hat, error } = await supabase
		.from(Routes.HAT)
		.select('*')
		.eq('id', id)
		.limit(1)
		.single();

	if (error) {
		console.error('Some data was not loaded:');
		console.error('practices', error.message);
	}

	const data = {
		hat,
	};

	return data;
}
