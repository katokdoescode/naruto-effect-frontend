import { Routes } from '$lib/constants/index.js';
import { supabase } from '$lib/supabaseClient.js';
import { createError } from '$lib/utils/errors.js';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const { id } = params;

	/** @type {SupabaseHatData} */
	const { data: hat, error } = await supabase
		.from(Routes.HAT)
		.select('id, isPutting, name, words, createdAt')
		.eq('id', id)
		.limit(1)
		.single();

	if (!error && hat) {
		return json({ success: true, data: hat });
	}
	return json(createError(false, error.message));
}

export async function PATCH({ request, params }) {
	/** @type {HatData} */
	const data = await request.json();
	const { id } = params;

	const { error } = await supabase.from(Routes.HAT).update(data).eq('id', id);

	if (!error && data) {
		return json({ success: true, data });
	}
	return json(createError(false, error.message));
}

export async function DELETE({ params }) {
	const { id } = params;

	const { error } = await supabase.from(Routes.HAT).delete().eq('id', id);

	if (!error) {
		return json({ success: true, data: null });
	}
	return json(createError(false, error.message));
}
