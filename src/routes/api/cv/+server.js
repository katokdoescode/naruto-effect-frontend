import { Routes } from '$lib/constants';
import { supabase } from '$lib/supabaseClient.js';
import { createError } from '$lib/utils/errors';
import { json } from '@sveltejs/kit';

export async function GET() {
	const { data: cv, error } = await supabase.from(Routes.CV).select();

	if (!error && cv) {
		return json({ success: true, data: cv });
	} else {
		return json(createError(false, error.message));
	}
}

export async function PATCH({ request }) {
	/** @type{CvData} */
	const data = await request.json();

	delete data.videoLink;

	const { error } = await supabase
		.from(Routes.CV)
		.update(data)
		.eq('id', data.id);

	if (!error && data) {
		return json({ success: true, data });
	} else {
		return json(createError(false, error.message));
	}
}
