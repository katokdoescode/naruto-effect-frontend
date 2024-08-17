import { Routes } from '$lib/constants';
import { supabase } from '$lib/supabaseClient';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, cookies }) {
	const isAuthenticated = !!cookies.get('authToken');
	const { slug } = params;

	const { data: project, error: projectError } = await supabase
		.from(Routes.PROJECTS)
		.select()
		.eq('slug', slug)
		.in('isVisible', [true, ...(isAuthenticated ? [false] : [])])
		.limit(1)
		.single();

	const { data: projects, error: projectsError } = await supabase
		.from(Routes.PROJECTS)
		.select('id, isVisible, slug, name')
		.in('isVisible', [true, ...(isAuthenticated ? [false] : [])]);

	if (projectError) throw error(404, projectError.message);
	if (projectsError) console.error('Projects was not loaded');

	return { project, projects };
}
