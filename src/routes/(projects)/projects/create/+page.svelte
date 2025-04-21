<script>
import { goto } from '$app/navigation';
import ProjectEditor from '$lib/modules/hokage/ProjectEditor.svelte';
import {
	canNavigate,
	isEditingState,
	needCancel,
	needSave,
} from '$lib/stores/appStore';
import { authorized } from '$lib/stores/authStore';
import { projects } from '$lib/stores/projectsStore';
import { clean } from '$lib/utils/objectsTools';
import { savePage } from '$lib/utils/pagesActions';
import { CarSlugger } from '@katokdoescode/car-slugger';
import { onMount } from 'svelte';

const slugger = new CarSlugger();

/** @type {Project} */
let localValue = {
	id: null,
	slug: '',
	name: { en: '', ru: '' },
	title: { en: '', ru: '' },
	description: { en: '', ru: '' },
	isVisible: false,
};

const initialValue = structuredClone(localValue);

$: localValue.slug = Object.values(localValue.name).find(Boolean)
	? slugger.getSlug(Object.values(localValue.name).find(Boolean))
	: '';

onMount(() => {
	const unsubscribe = needSave.subscribe(async (save) => {
		if (!save) return;

		const response = await savePage(clean(localValue), {
			route: '/api/projects',
			method: 'POST',
		});

		if (response) {
			projects.update((projects) => [...projects, response]);
			needSave.set(false);
			canNavigate.set(true);
			goto(`/projects/${response.slug}`);
		}
	});

	const unsubscribeCancel = needCancel.subscribe(async (cancel) => {
		if (!cancel) return;
		localValue = structuredClone(initialValue);
		needCancel.set(false);
		isEditingState.set(false);
		goto('/projects');
	});

	isEditingState.set(true);
	canNavigate.set(false);

	return () => {
		unsubscribe();
		unsubscribeCancel();
		canNavigate.set(false);
		isEditingState.set(false);
	};
});
</script>

{#if $authorized}
	<ProjectEditor slugIsReadOnly={true} bind:localValue />
{/if}
