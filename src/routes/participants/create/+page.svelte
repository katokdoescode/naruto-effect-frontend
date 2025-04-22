<script>
import { goto } from '$app/navigation';
import ParticipantEditor from '$lib/modules/hokage/ParticipantEditor.svelte';
import {
	canNavigate,
	editingPageStatus,
	isDataValid,
	isEditingState,
} from '$lib/stores/appStore';
import { needCancel, needSave } from '$lib/stores/appStore';
import { authorized } from '$lib/stores/authStore';
import { participants } from '$lib/stores/participantsPageStore';
import { clean } from '$lib/utils/objectsTools';
import { savePage } from '$lib/utils/pagesActions';
import { validateParticipant } from '$lib/utils/validation/validateParticipant';
import { CarSlugger } from '@katokdoescode/car-slugger';
import { onMount } from 'svelte';
import { locale } from 'svelte-i18n';
const slugger = new CarSlugger();

isEditingState.set(true);
editingPageStatus.set(null);

/** @type {Participant} */
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

$: isDataValid?.set(validateParticipant(localValue, $locale));

onMount(() => {
	canNavigate.set(false);

	const unsubscribe = needSave.subscribe(async (save) => {
		if (!save) return;

		const response = await savePage(clean(localValue), {
			route: '/api/participants',
			method: 'POST',
		});

		if (response) {
			participants.set([...$participants, response]);
			canNavigate.set(true);
			localValue = structuredClone(initialValue);
			goto(`/participants/${response.slug}`);
		}
	});

	const unsubscribeCancel = needCancel.subscribe(async (cancel) => {
		if (!cancel) return;
		needCancel.set(false);
	});

	return () => {
		unsubscribe();
		unsubscribeCancel();
		canNavigate.set(false);
		isEditingState.set(false);
	};
});
</script>

{#if $authorized}
	<ParticipantEditor bind:localValue />
{/if}
