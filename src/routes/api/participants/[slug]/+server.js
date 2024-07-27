import { Routes } from '$lib/constants/index.js';
import { supabase } from '$lib/supabaseClient.js';
import { createError } from '$lib/utils/errors.js';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const { slug } = params;

	const { data: participant, error } = await supabase
		.from(Routes.PARTICIPANTS)
		.select()
		.eq('slug', slug)
		.limit(1)
		.single();

	if (!error && participant) {
		return json({ success: true, data: participant });
	}
	return json(createError(false, error.message));
}
