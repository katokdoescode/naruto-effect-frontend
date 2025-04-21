<script>
import { goto } from '$app/navigation';
import PracticeEditor from '$lib/modules/hokage/PracticeEditor.svelte';
import { canNavigate, needCancel, needSave } from '$lib/stores/appStore';
import { practices } from '$lib/stores/practicesPageStore';
import { clean } from '$lib/utils/objectsTools';
import { savePage } from '$lib/utils/pagesActions';
import { CarSlugger } from '@katokdoescode/car-slugger';
import { getContext, onMount } from 'svelte';
import { locale } from 'svelte-i18n';
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

const initialValue = structuredClone(localValue);

$: Object.entries(localValue.title).forEach(([key, value]) => {
	if (value) localValue.slug[key] = slugger.getSlug(localValue.title[key]);
});

onMount(() => {
	const unsubscribe = needSave.subscribe(async (save) => {
		if (!save) return;

		const response = await savePage(clean(localValue), {
			route: '/api/practices',
			method: 'POST',
		});

		if (response) {
			practices.set([...$practices, response]);
			canNavigate.set(true);
			needSave.set(false);
			goto(`/practices/${response.slug[$locale]}`);
		}
	});

	const unsubscribeCancel = needCancel.subscribe(async (cancel) => {
		if (!cancel) return;
		localValue = structuredClone(initialValue);
		needCancel.set(false);
		isEditingState.set(false);
		canNavigate.set(true);
		goto('/');
	});

	canNavigate.set(false);

	return () => {
		unsubscribe();
		unsubscribeCancel();
		isEditingState.set(false);
		canNavigate.set(false);
	};
});
</script>

<svelte:head>
	{#if $authorized && $isEditingState}
		<title>Creating new practice</title>
	{/if}
</svelte:head>

{#if $authorized}
	<PracticeEditor bind:localValue />
{/if}
