import { ColorSchemes } from '$lib/constants';
import { writable } from 'svelte/store';

export const appColorScheme = writable(ColorSchemes.AUTO);
