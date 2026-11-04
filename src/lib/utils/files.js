import { STORAGE_BUCKET, getSupabase } from '$lib/supabaseClient';

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
 * Returns the storage path of a public file URL of our bucket, or null.
 *
 * @param {string|null|undefined} url
 */
function pathFromPublicUrl(url) {
	const marker = `/object/public/${STORAGE_BUCKET}/`;
	const index = url?.indexOf(marker) ?? -1;
	return index === -1
		? null
		: decodeURIComponent(url.slice(index + marker.length));
}

/**
 * Uploads a file to the public bucket and returns its public URL.
 * When `replaceUrl` is given, that old file is removed after the upload.
 *
 * @param {File} file
 * @param {{ type: string, prefix?: string|null, replaceUrl?: string|null }} params
 * @returns {Promise<{ url: string|null, error: Error|null }>}
 */
export async function uploadFile(file, { type, prefix, replaceUrl }) {
	const storage = getSupabase().storage.from(STORAGE_BUCKET);
	const path = [type, prefix, uniqueFileName(file.name)]
		.filter(Boolean)
		.join('/');

	const { error } = await storage.upload(path, file, {
		contentType: file.type || undefined,
	});
	if (error) return { url: null, error };

	const oldPath = pathFromPublicUrl(replaceUrl);
	if (oldPath && oldPath !== path) {
		const { error: removeError } = await storage.remove([oldPath]);
		if (removeError) console.error('Failed to remove old file', removeError);
	}

	return { url: storage.getPublicUrl(path).data.publicUrl, error: null };
}
