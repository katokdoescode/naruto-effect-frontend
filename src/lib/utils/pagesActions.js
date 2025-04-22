import { PageStatuses } from '$lib/constants';
import { editingPageStatus, needSave } from '$lib/stores/appStore';

export async function savePage(pageData, params = { route: '', method: '' }) {
	editingPageStatus.set(PageStatuses.LOADING);

	const response = await fetch(params.route, {
		method: params.method,
		body: JSON.stringify(pageData),
	}).then((data) => data.json());

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

export async function deletePage(pageData, params = { route: '' }) {
	editingPageStatus.set(PageStatuses.LOADING);

	const response = await fetch(params.route, {
		method: 'DELETE',
		body: JSON.stringify(pageData),
	}).then((data) => data.json());

	if (response.success) {
		editingPageStatus.set(PageStatuses.SUCCESS);
		setTimeout(() => editingPageStatus.set(null), 2500);
		return response.data;
	}

	editingPageStatus.set(PageStatuses.ERROR);
	setTimeout(() => editingPageStatus.set(null), 3500);
	return null;
}
