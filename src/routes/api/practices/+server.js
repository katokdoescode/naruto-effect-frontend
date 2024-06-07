import { Routes } from '$lib/constants/index.js';
import { supabase } from '$lib/supabaseClient.js';
import { createError } from '$lib/utils/errors';
import { json } from '@sveltejs/kit';

export async function GET({ cookies }) {
	const isAuthenticated = !!cookies.get('authToken');

	/** @type{SupabasePracticesPartial} */
	const response = await supabase
		.from(Routes.PRACTICES)
		.select('id, isVisible, slug, title')
		.in('isVisible', [false, ...(isAuthenticated ? [true] : [])]);

	const { data: practices, error } = response;

	if (practices) {
		return json({
			success: true,
			data: practices
		});
	} else {
		return json(createError(false, error.message));
	}
}

export async function POST({ request }) {
	/** @type {Practice} */
	const data = await request.json();

	delete data.originalSlug;

	/** @type{SupabasePractice} */
	const response = await supabase
		.from(Routes.PRACTICES)
		.insert(data)
		.select()
		.single();

	const { error, data: practice, status } = response;

	if (!error && data && status === 201) {
		return json({ success: true, data: practice });
	} else {
		return json(createError(false, error.message));
	}
}

export async function PATCH({ request }) {
	/** @type {Practice} */
	const data = await request.json();

	delete data.originalSlug;

	/** @type {SupabasePractice} */
	const response = await supabase
		.from(Routes.PRACTICES)
		.update(data)
		.eq('id', data.id)
		.select()
		.single();

	const { error, data: practice, status } = response;

	if (!error && practice && status === 200) {
		return json({ success: true, data: practice });
	} else {
		return json(createError(false, error.message));
	}
}

export async function DELETE({ request }) {
	/** @type {Practice} */
	const data = await request.json();

	delete data.originalSlug;

	const { error, status } = await supabase
		.from(Routes.PRACTICES)
		.delete()
		.eq('id', data.id);

	if (!error && data && status === 204) {
		return json({ success: true });
	} else {
		return json(createError(false, error.message));
	}
}
