<script>
/* eslint-disable svelte/no-at-html-tags */
import CvPageEditor from '$lib/modules/hokage/CvPageEditor.svelte';
import {
	canNavigate,
	isDataValid,
	needCancel,
	needSave,
} from '$lib/stores/appStore';
import { isEditingState } from '$lib/stores/appStore';
import { clean } from '$lib/utils/objectsTools';
import { savePage } from '$lib/utils/pagesActions';
import { validateCv } from '$lib/utils/validation/validateCv';
import { onMount } from 'svelte';
import { locale } from 'svelte-i18n';

/** @type {import('./$types').PageData} */
export let data;

let localValue = data?.cvData;

$: isDataValid?.set(validateCv(localValue, $locale));

onMount(() => {
	const unsubscribe = needSave.subscribe(async (save) => {
		if (!save) return;

		const response = await savePage(clean(localValue), {
			route: '/api/cv',
			method: 'PATCH',
		});

		if (response) {
			data.cvData = response;
			localValue = response;
			isEditingState.set(false);
			needSave.set(false);
		}
	});

	const unsubscribeCancel = needCancel.subscribe(async (cancel) => {
		if (!cancel) return;

		localValue = data?.cvData;
		needCancel.set(false);
		isEditingState.set(false);
	});

	canNavigate.set(false);

	return () => {
		unsubscribe();
		unsubscribeCancel();
		canNavigate.set(false);
		isEditingState.set(false);
	};
});
</script>

{#if $isEditingState}
	<CvPageEditor bind:localValue />
{:else}
	<h1>{localValue.title[$locale]}</h1>
	<article class="main-article">
		{@html localValue.text[$locale]}
	</article>
{/if}
