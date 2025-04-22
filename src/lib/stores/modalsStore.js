import { writable } from 'svelte/store';

export const deleteModalDecision = writable(undefined);
export const isShowDeleteModal = writable(false);
export const isShowConfirmExitModal = writable(false);
export const confirmExitModalDecision = writable(undefined);

export const isShowConfirmLeaveModal = writable(false);
export const confirmLeaveModalDecision = writable(undefined);
