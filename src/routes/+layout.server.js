import { VITE_LOGIN_PHRASE } from '$env/static/private';
import { Routes } from '$lib/constants';
import { supabase } from '$lib/supabaseClient';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
	const isAuthenticated = !!cookies.get('authToken');

	/** @type {SupabasePracticesPartial} */
	const { data: practices, error: practicesError } = await supabase
		.from(Routes.PRACTICES)
		.select('id, isVisible, slug, title')
		.eq(isAuthenticated ? '' : 'isVisible', true);

	const { data: participants, error: participantsError } = await supabase
		.from(Routes.PARTICIPANTS)
		.select('id, isVisible, slug, name')
		.order('slug')
		.eq(isAuthenticated ? '' : 'isVisible', true);

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
		loginPhrase: VITE_LOGIN_PHRASE
	};

	return data;
}
