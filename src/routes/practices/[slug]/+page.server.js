import { Routes } from '$lib/constants';
import { supabase } from '$lib/supabaseClient.js';
import { error } from '@sveltejs/kit';
import { locales } from 'svelte-i18n';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, cookies }) {
	const isAuthenticated = !!cookies.get('authToken');
	const { slug } = params;
	let localesList = [];

	const unsubscribe = locales.subscribe((locale) => {
		localesList = locale;
	});

	if (localesList.length) {
		localesList = localesList.map((locale) => `slug->>${locale}.eq.${slug}`);
	} else {
		throw error(500, 'Something went wrong with slugs');
	}

	/** @type {SupabasePractice} */
	const { data: practice, error: supabaseError } = await supabase
		.from(Routes.PRACTICES)
		.select()
		.or(localesList.join())
		.limit(1)
		.single();

	/** @type {SupabasePracticeList} */
	const { data: practices, error: practicesError } = await supabase
		.from(Routes.PRACTICES)
		.select('id, isVisible, slug, title')
		.in('isVisible', [true, ...(isAuthenticated ? [false] : [])]);

	unsubscribe();

	if (supabaseError) throw error(404, supabaseError.message);
	if (practicesError) console.error('Practices was not loaded.');

	return {
		practice: { ...practice, originalSlug: structuredClone(practice.slug) },
		practices,
	};
}
