import { VITE_SUPABASE_BUCKET } from '$env/static/private';
import { json } from '@sveltejs/kit';

/**
 * @param {import('@supabase/supabase-js').SupabaseClient} supabase
 */
async function deleteFile(supabase, type, prefix, link) {
	if (!link) return;
	const paths = link.split('/');
	const imageName = paths[paths.length - 1];
	const fullPath = `${type}/${prefix ? `${prefix}/` : ''}${imageName}`;
	await supabase.storage.from(VITE_SUPABASE_BUCKET).remove([fullPath]);
}

/**
 * Makes a unique file name, so uploads with the same name
 * (iPhone camera photos are all called `image.jpg`) don't overwrite each other.
 *
 * @param {string} name
 */
function uniqueFileName(name) {
	const dotIndex = name.lastIndexOf('.');
	const base = dotIndex > 0 ? name.slice(0, dotIndex) : name;
	const extension = dotIndex > 0 ? name.slice(dotIndex).toLowerCase() : '';
	const safeBase =
		base
			.normalize('NFKD')
			.replace(/[^\w-]+/g, '-')
			.replace(/^-+|-+$/g, '')
			.slice(0, 60) || 'file';
	const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
	return `${safeBase}-${suffix}${extension}`;
}

/**
 * @param {import('@supabase/supabase-js').SupabaseClient} supabase
 * @returns {Promise<{ url: string; error: object; }>}
 */
async function uploadFile(supabase, file, type, prefix, link) {
	const bucket = VITE_SUPABASE_BUCKET;
	const fullPath = `${type}/${prefix ? `${prefix}/` : ''}${uniqueFileName(file.name)}`;
	const { error } = await supabase.storage
		.from(bucket)
		.upload(fullPath, file, { contentType: file.type || undefined });

	if (error) {
		return {
			url: null,
			error,
		};
	}
	const { data } = supabase.storage.from(bucket).getPublicUrl(fullPath);
	if (link && fullPath !== link) deleteFile(supabase, type, prefix, link);
	return {
		url: data.publicUrl,
		error: null,
	};
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
	const data = await request.formData();

	const file = data.get('file');
	const type = data.get('type');
	const prefix = data.get('prefix');
	const link = data.get('link');

	const result = await uploadFile(locals.supabase, file, type, prefix, link);
	return json(result);
}
