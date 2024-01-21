import { Routes } from '$lib/constants';
import { supabase } from '$lib/supabaseClient.js';
import { createError } from '$lib/utils/errors';
import { json } from '@sveltejs/kit';

export async function GET() {
	const { data: pageData, error } = await supabase
		.from(Routes.MAIN_PAGE)
		.select()
		.limit(1)
		.single();

	if (!error && pageData) {
		return json({ success: true, data: pageData });
	} else {
		return json(createError(false, error.message));
	}
}

export async function PATCH({ request }) {
	/** @type {MainPageData} */
	const data = await request.json();

	const { error } = await supabase
		.from(Routes.MAIN_PAGE)
		.update(data)
		.eq(data.id.toString());

	if (!error && data) {
		return json({ success: true, data });
	} else {
		return json(createError(false, error.message));
	}
}
