import { Routes } from '$lib/constants';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const { supabase, isAuthenticated } = locals;

	const { data: projects, error: projectsError } = await supabase
		.from(Routes.PROJECTS)
		.select('id, isVisible, slug, name')
		.in('isVisible', [true, ...(isAuthenticated ? [false] : [])]);

	if (projectsError) console.error('Projects was not loaded');

	return { projects };
}
