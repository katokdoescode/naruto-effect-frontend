import { supabase } from '$lib/supabaseClient.js';
import { json } from '@sveltejs/kit';
import { VITE_SUPABASE_BUCKET } from '$env/static/private';

async function deleteFile(type, prefix, link) {
	if (!link) return;
	const paths = link.split('/');
	const imageName = paths[paths.length - 1];
	const fullPath = `${type}/${prefix ? prefix + '/' : ''}${imageName}`;
	await supabase.storage.from(VITE_SUPABASE_BUCKET).remove([fullPath]);
}

/**
 * @returns {Promise<{ url: string; error: object; }>}
 */
async function uploadFile(file, type, prefix, link) {
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
		if (link && fullPath !== link) deleteFile(type, prefix, link);
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
	const link = data.get('link');

	const result = await uploadFile(file, type, prefix, link);
	return json(result);
}
