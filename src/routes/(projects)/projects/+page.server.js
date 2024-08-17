import { Routes } from '$lib/constants';
import { supabase } from '$lib/supabaseClient';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	const isAuthenticated = !!cookies.get('authToken');

	const { data: projects, error: projectsError } = await supabase
		.from(Routes.PROJECTS)
		.select('id, isVisible, slug, name')
		.in('isVisible', [true, ...(isAuthenticated ? [false] : [])]);

	if (projectsError) console.error('Projects was not loaded');

	return { projects };
}
