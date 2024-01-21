import { supabase } from '$lib/supabaseClient.js';
import { createError } from '$lib/utils/errors.js';
import { json } from '@sveltejs/kit';
import { locales } from 'svelte-i18n';

export async function GET({ params }) {
	const { slug } = params;
	let localesList = [];

	locales.subscribe((locale) => {
		localesList = locale;
	});

	if (localesList.length) {
		localesList = localesList.map((locale) => `slug->>${locale}.eq.${slug}`);
	} else {
		return json(createError(false, 'Can not receive locales'));
	}

	const { data: practice, error } = await supabase
		.from('practices')
		.select()
		.or(localesList.join())
		.limit(1)
		.single();

	if (!error && practice) {
		return json({ success: true, data: practice });
	} else {
		return json(createError(false, error.message));
	}
}
