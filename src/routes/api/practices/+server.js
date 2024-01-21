import { Routes } from '$lib/constants/index.js';
import { supabase } from '$lib/supabaseClient.js';
import { createError } from '$lib/utils/errors';
import { json } from '@sveltejs/kit';

export async function GET({ cookies }) {
	const isAuthenticated = !!cookies.get('authToken');

	const { data: practices, error } = await supabase
		.from(Routes.PRACTICES)
		.select('id, isVisible, slug, title');

	if (practices) {
		return json({
			success: true,
			data: practices.filter(({ isVisible }) => isAuthenticated || isVisible)
		});
	} else {
		return json(createError(false, error.message));
	}
}

export async function POST({ request }) {
	/** @type {Practice} */
	const data = await request.json();

	const { error } = await supabase.from(Routes.PRACTICES).insert(data);

	if (!error && data) {
		return json({ success: true, data });
	} else {
		return json(createError(false, error.message));
	}
}

export async function PATCH({ request }) {
	/** @type {Practice} */
	const data = await request.json();

	const { error } = await supabase
		.from(Routes.PRACTICES)
		.update(data)
		.eq('id', data.id.toString());

	if (!error && data) {
		return json({ success: true, data });
	} else {
		return json(createError(false, error.message));
	}
}

export async function DELETE({ request }) {
	/** @type {Practice} */
	const data = await request.json();

	const { error } = await supabase
		.from(Routes.PRACTICES)
		.delete()
		.eq('id', data.id.toString());

	if (!error && data) {
		return json({ success: true, data });
	} else {
		return json(createError(false, error.message));
	}
}
