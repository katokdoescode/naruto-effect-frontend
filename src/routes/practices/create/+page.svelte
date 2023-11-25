<script>
	import PracticeEditor from '$lib/modules/hokage/PracticeEditor.svelte';
	import { clean } from '$lib/utils/objectsTools';
	import { CarSlugger } from '@katokdoescode/car-slugger';
	import { getContext } from 'svelte';

	const isEditingState = getContext('isEditingState');
	const contentPageStatus = getContext('contentPageStatus');
	const authorized = getContext('authorized');
	const practiceData = getContext('practiceData');

	const slugger = new CarSlugger();

	isEditingState.set(true);
	contentPageStatus.set(null);

	/** @type{Practice} */
	let localValue = {
		id: null,
		slug: { en: '', ru: '' },
		title: { en: '', ru: '' },
		subtitle: { en: '', ru: '' },
		description: { en: '', ru: '' },
		videoLink: '',
		isVisible: false
	};

	$: Object.entries(localValue.title).forEach(([key, value]) => {
		if (value) localValue.slug[key] = slugger.getSlug(localValue.title[key]);
	});

	$: practiceData.set(clean(localValue));
</script>

{#if $authorized}
	<PracticeEditor bind:localValue />
{/if}
