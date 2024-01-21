import { Routes } from '$lib/constants';
import { supabase } from '$lib/supabaseClient.js';
import { createError } from '$lib/utils/errors';
import { json } from '@sveltejs/kit';

export async function GET({ cookies }) {
	const isAuthenticated = !!cookies.get('authToken');

	const { data: participants, error } = await supabase
		.from(Routes.PARTICIPANTS)
		.select('id, isVisible, slug, name');

	if (!error && participants) {
		return json({
			success: true,
			data: participants.filter(({ isVisible }) => isAuthenticated || isVisible)
		});
	} else {
		return json(createError(false, error.message));
	}
}

export async function POST({ request }) {
	/** @type {Practice} */
	const data = await request.json();

	const { error } = await supabase.from(Routes.PARTICIPANTS).insert(data);

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
		.from(Routes.PARTICIPANTS)
		.update(data)
		.eq(data.id.toString());

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
		.from(Routes.PARTICIPANTS)
		.delete()
		.eq(data.id.toString());

	if (!error && data) {
		return json({ success: true, data });
	} else {
		return json(createError(false, error.message));
	}
}
