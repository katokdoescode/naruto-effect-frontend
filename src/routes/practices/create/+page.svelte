<script>
import PracticeEditor from '$lib/modules/hokage/PracticeEditor.svelte';
import { clean } from '$lib/utils/objectsTools';
import { CarSlugger } from '@katokdoescode/car-slugger';
import { getContext } from 'svelte';

const isEditingState = getContext('isEditingState');
const editingPageStatus = getContext('editingPageStatus');
const authorized = getContext('authorized');
const practiceData = getContext('practiceData');

const slugger = new CarSlugger();

isEditingState.set(true);
editingPageStatus.set(null);

/** @type{Practice} */
let localValue = {
	id: null,
	slug: { en: '', ru: '' },
	title: { en: '', ru: '' },
	subtitle: { en: '', ru: '' },
	description: { en: '', ru: '' },
	isVisible: false,
	originalSlug: { en: '', ru: '' },
	bannerMode: 'image',
	banner: { link: null, alt: null },
	iframe: null,
};

$: Object.entries(localValue.title).forEach(([key, value]) => {
	if (value) localValue.slug[key] = slugger.getSlug(localValue.title[key]);
});

$: practiceData.set(clean(localValue));
</script>

<svelte:head>
	{#if $authorized && $isEditingState}
		<title>Creating new practice</title>
	{/if}
</svelte:head>

{#if $authorized}
	<PracticeEditor bind:localValue />
{/if}
