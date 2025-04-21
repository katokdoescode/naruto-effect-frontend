import { writable } from 'svelte/store';

export const isEditingState = writable(false);
export const needSave = writable(false);
export const needDelete = writable(false);
export const needCancel = writable(false);
export const editingPageStatus = writable(null);
export const canNavigate = writable(false);
