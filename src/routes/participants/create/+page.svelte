<script>
	import { Placeholder } from '$lib/constants';
	import TextEditor from '$lib/modules/TextEditor.svelte';
	import Textarea from '$lib/ui/Textarea.svelte';
	import { clean } from '$lib/utils/objectCleaner';
	import { CarSlugger } from '@katokdoescode/car-slugger';
	import { getContext } from 'svelte';
	import { locale } from 'svelte-i18n';

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
	<h1 class="main-header">
		<Textarea
			id="practiceTitle"
			placeholder="Имя и фамилия практиканта/практикантки"
			bind:value={localValue.name[$locale]}
		/>
	</h1>
	<h2 class="main-header">
		<Textarea
			id="practiceSubtitle"
			placeholder="Кто он/она?"
			bind:value={localValue.title[$locale]}
		/>
	</h2>

	<TextEditor
		id="practiceDescription"
		placeholder={Placeholder.participant}
		bind:value={localValue.description[$locale]}
	/>
{/if}
