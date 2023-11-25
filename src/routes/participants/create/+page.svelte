<script>
	import ParticipantEditor from '$lib/modules/hokage/ParticipantEditor.svelte';
	import { clean } from '$lib/utils/objectsTools';
	import { CarSlugger } from '@katokdoescode/car-slugger';
	import { getContext } from 'svelte';

	const isEditingState = getContext('isEditingState');
	const contentPageStatus = getContext('contentPageStatus');
	const authorized = getContext('authorized');
	const participantData = getContext('participantData');

	const slugger = new CarSlugger();

	isEditingState.set(true);
	contentPageStatus.set(null);

	/** @type{Participant} */
	let localValue = {
		id: null,
		slug: '',
		name: { en: '', ru: '' },
		title: { en: '', ru: '' },
		description: { en: '', ru: '' },
		isVisible: false
	};

	$: localValue.slug = Object.values(localValue.name).find(Boolean)
		? slugger.getSlug(Object.values(localValue.name).find(Boolean))
		: '';

	$: participantData.set(clean(localValue));
</script>

{#if $authorized}
	<ParticipantEditor bind:localValue />
{/if}
