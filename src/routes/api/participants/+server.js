import { Routes } from '$lib/constants';
import { createError } from '$lib/utils/errors';
import { json } from '@sveltejs/kit';

export async function GET({ locals }) {
	const { supabase, isAuthenticated } = locals;

	const { data: participants, error } = await supabase
		.from(Routes.PARTICIPANTS)
		.select('id, isVisible, slug, name')
		.order('slug')
		.in('isVisible', [true, ...(isAuthenticated ? [false] : [])]);

	if (!error && participants) {
		return json({
			success: true,
			data: participants,
		});
	}
	return json(createError(false, error.message));
}

export async function POST({ request, locals }) {
	const { supabase } = locals;
	/** @type {Practice} */
	const data = await request.json();

	const { error } = await supabase.from(Routes.PARTICIPANTS).insert(data);

	if (!error && data) {
		return json({ success: true, data });
	}
	return json(createError(false, error.message));
}

export async function PATCH({ request, locals }) {
	const { supabase } = locals;
	/** @type {Participant} */
	const data = await request.json();

	const { error } = await supabase
		.from(Routes.PARTICIPANTS)
		.update(data)
		.eq('id', data.id);

	if (!error && data) {
		return json({ success: true, data });
	}
	return json(createError(false, error.message));
}

export async function DELETE({ request, locals }) {
	const { supabase } = locals;
	/** @type {Practice} */
	const data = await request.json();

	const { error } = await supabase
		.from(Routes.PARTICIPANTS)
		.delete()
		.eq('id', data.id);

	if (!error && data) {
		return json({ success: true, data });
	}
	return json(createError(false, error.message));
}
