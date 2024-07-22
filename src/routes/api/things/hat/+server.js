import { Routes } from '$lib/constants';
import { supabase } from '$lib/supabaseClient.js';
import { createError } from '$lib/utils/errors';
import { json } from '@sveltejs/kit';

export async function GET() {
	const { data: hat, error } = await supabase
		.from(Routes.HAT)
		.select('id, isPutting, name, words, createdAt');

	if (!error && hat) {
		return json({
			success: true,
			data: hat,
		});
	}
	return json(createError(false, error.message));
}

export async function POST({ request }) {
	/** @type {HatData} */
	const data = await request.json();

	/** @type {SupabaseHatData} */
	const { data: hat, error } = await supabase
		.from(Routes.HAT)
		.insert(data)
		.select('id, isPutting, name, words, createdAt')
		.limit(1)
		.single();

	if (!error && data) {
		return json({ success: true, data: hat });
	}
	return json(createError(false, error.message));
}
