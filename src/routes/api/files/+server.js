import { supabase } from '$lib/supabaseClient.js';
import { json } from '@sveltejs/kit';
import { VITE_SUPABASE_BUCKET } from '$env/static/private';

async function uploadFile(file, type, prefix = '') {
	const bucket = VITE_SUPABASE_BUCKET;
	const fullPath = `${type}/${prefix ? prefix + '/' : ''}${file.name}`;
	const { error } = await supabase.storage
		.from(bucket)
		.upload(fullPath, file, { upsert: true });

	if (error) {
		return {
			url: null,
			error
		};
	} else {
		const { data } = supabase.storage.from(bucket).getPublicUrl(fullPath);
		return {
			url: data.publicUrl,
			error: null
		};
	}
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const data = await request.formData();

	const file = data.get('file');
	const type = data.get('type');
	const prefix = data.get('prefix');

	const result = await uploadFile(file, type, prefix);
	return json(result);
}
