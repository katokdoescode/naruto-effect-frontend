import { writable } from 'svelte/store';

export const deleteModalDecision = writable(undefined);
export const isShowDeleteModal = writable(false);
export const isShowConfirmExitModal = writable(false);
export const confirmExitModalDecision = writable(undefined);
