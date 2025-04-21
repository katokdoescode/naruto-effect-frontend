<script>
import ParticipantEditor from '$lib/modules/hokage/ParticipantEditor.svelte';
import ProjectEditor from '$lib/modules/hokage/ProjectEditor.svelte';
import { isEditingState } from '$lib/stores/appStore';
import { authorized } from '$lib/stores/authStore';
import { clean } from '$lib/utils/objectsTools';
import { CarSlugger } from '@katokdoescode/car-slugger';
import { getContext } from 'svelte';

const editingPageStatus = getContext('editingPageStatus');
const projectData = getContext('projectData');

const slugger = new CarSlugger();

isEditingState.set(true);
editingPageStatus.set(null);

/** @type {Project} */
let localValue = {
	id: null,
	slug: '',
	name: { en: '', ru: '' },
	title: { en: '', ru: '' },
	description: { en: '', ru: '' },
	isVisible: false,
};

$: localValue.slug = Object.values(localValue.name).find(Boolean)
	? slugger.getSlug(Object.values(localValue.name).find(Boolean))
	: '';

$: projectData.set(clean(localValue));
</script>

	{#if $authorized}
		<ProjectEditor bind:localValue />
	{/if}
