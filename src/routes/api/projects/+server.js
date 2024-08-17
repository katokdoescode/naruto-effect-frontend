import { Routes } from '$lib/constants';
import { supabase } from '$lib/supabaseClient.js';
import { createError } from '$lib/utils/errors';
import { json } from '@sveltejs/kit';

export async function GET({ cookies }) {
	const isAuthenticated = !!cookies.get('authToken');

	const { data: projects, error } = await supabase
		.from(Routes.PROJECTS)
		.select('id, isVisible, slug, name')
		.order('slug')
		.in('isVisible', [true, ...(isAuthenticated ? [false] : [])]);

	if (!error && projects) {
		return json({
			success: true,
			data: projects,
		});
	}
	return json(createError(false, error.message));
}

export async function POST({ request }) {
	/** @type {Project} */
	const data = await request.json();

	const { error } = await supabase.from(Routes.PROJECTS).insert(data);

	if (!error && data) {
		return json({ success: true, data });
	}
	return json(createError(false, error.message));
}

export async function PATCH({ request }) {
	/** @type {Project} */
	const data = await request.json();

	const { error } = await supabase
		.from(Routes.PROJECTS)
		.update(data)
		.eq('id', data.id);

	if (!error && data) {
		return json({ success: true, data });
	}
	return json(createError(false, error.message));
}

export async function DELETE({ request }) {
	/** @type {Project} */
	const data = await request.json();

	const { error } = await supabase
		.from(Routes.PROJECTS)
		.delete()
		.eq('id', data.id);

	if (!error && data) {
		return json({ success: true, data });
	}
	return json(createError(false, error.message));
}
