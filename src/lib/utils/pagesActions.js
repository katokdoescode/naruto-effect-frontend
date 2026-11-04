import { PageStatuses } from '$lib/constants';
import { editingPageStatus, needSave } from '$lib/stores/appStore';
import { getSupabase } from '$lib/supabaseClient';

/** Fields of the page state that are not table columns. */
const NON_COLUMN_FIELDS = ['originalSlug'];

/**
 * Inserts (`POST`) or updates (`PATCH`) a row and returns the saved row.
 * Access is checked by RLS in Supabase.
 *
 * @param {string} table
 * @param {'POST'|'PATCH'} method
 * @param {object} rowData
 * @param {string[]} [omit] - extra fields to leave out
 * @returns {Promise<{ success: boolean, data?: any, errorMessage?: string }>}
 */
export async function writeRow(table, method, rowData, omit = []) {
	const row = { ...rowData };
	for (const field of [...NON_COLUMN_FIELDS, ...omit]) delete row[field];

	const query = getSupabase().from(table);
	const { data, error } =
		method === 'POST'
			? await query.insert(row).select().single()
			: await query.update(row).eq('id', row.id).select().single();

	if (error) {
		console.error(`Failed to save ${table}:`, error.message);
		return { success: false, errorMessage: error.message };
	}
	return { success: true, data };
}

/**
 * @param {object} pageData
 * @param {{ table: string, method: 'POST'|'PATCH', omit?: string[] }} params
 */
export async function savePage(pageData, { table, method, omit = [] }) {
	editingPageStatus.set(PageStatuses.LOADING);

	const response = await writeRow(table, method, pageData, omit);

	needSave.set(false);

	if (response.success) {
		editingPageStatus.set(PageStatuses.SUCCESS);
		setTimeout(() => editingPageStatus.set(null), 2500);
		return response.data;
	}

	editingPageStatus.set(PageStatuses.ERROR);
	setTimeout(() => editingPageStatus.set(null), 3500);
	return null;
}

/**
 * @param {{ id: number }} pageData
 * @param {{ table: string }} params
 */
export async function deletePage(pageData, { table }) {
	editingPageStatus.set(PageStatuses.LOADING);

	const { error } = await getSupabase()
		.from(table)
		.delete()
		.eq('id', pageData.id);

	if (!error) {
		editingPageStatus.set(PageStatuses.SUCCESS);
		setTimeout(() => editingPageStatus.set(null), 2500);
		return true;
	}

	console.error(`Failed to delete from ${table}:`, error.message);
	editingPageStatus.set(PageStatuses.ERROR);
	setTimeout(() => editingPageStatus.set(null), 3500);
	return null;
}
