import { writable } from 'svelte/store';

export const isEditingState = writable(false);
export const needSave = writable(false);
export const needDelete = writable(false);
export const needCancel = writable(false);
export const isDataValid = writable(true);
export const editingPageStatus = writable(null);
export const canNavigate = writable(false);

export const combo = writable(null);
export const isFooterEditorOpen = writable(false);
export const footerEditorState = writable(null);
