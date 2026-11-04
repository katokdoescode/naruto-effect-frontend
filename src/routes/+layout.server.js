import { VITE_LOGIN_PHRASE } from '$env/static/private';
import { Routes } from '$lib/constants';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
	const { supabase, isAuthenticated } = locals;

	/** @type {SupabasePracticeList} */
	const { data: practices, error: practicesError } = await supabase
		.from(Routes.PRACTICES)
		.select('id, isVisible, slug, title')
		.in('isVisible', [true, ...(isAuthenticated ? [false] : [])]);

	const { data: participants, error: participantsError } = await supabase
		.from(Routes.PARTICIPANTS)
		.select('id, isVisible, slug, name')
		.order('slug')
		.in('isVisible', [true, ...(isAuthenticated ? [false] : [])]);

	const { data: pageData, error: pageDataError } = await supabase
		.from('common')
		.select()
		.limit(1)
		.single();

	if (practicesError || participantsError || pageDataError) {
		console.error('Some data was not loaded:');
		console.error('practices', practicesError.message);
		console.error('participants', participantsError.message);
		console.error('pageData', pageDataError.message);
	}

	const data = {
		authorized: isAuthenticated,
		practices,
		participants,
		pageData,
		loginPhrase: VITE_LOGIN_PHRASE,
	};

	return data;
}
