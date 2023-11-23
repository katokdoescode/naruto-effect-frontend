<script>
	import { Placeholder } from '$lib/constants';
	import TextEditor from '$lib/modules/TextEditor.svelte';
	import Input from '$lib/ui/Input.svelte';
	import Textarea from '$lib/ui/Textarea.svelte';
	import { clean } from '$lib/utils/objectCleaner';
	import { CarSlugger } from '@katokdoescode/car-slugger';
	import { getContext } from 'svelte';
	import { locale } from 'svelte-i18n';

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
		videoLink: '',
		description: { en: '', ru: '' }
	};

	$: Object.entries(localValue.title).forEach(([key, value]) => {
		if (value) localValue.slug[key] = slugger.getSlug(localValue.title[key]);
	});

	$: practiceData.set(clean(localValue));
</script>

{#if $authorized}
	<h1 class="main-header">
		<Textarea
			id="practiceTitle"
			placeholder="Название практики"
			bind:value={localValue.title[$locale]}
		/>
	</h1>
	<h2 class="main-header">
		<Textarea
			id="practiceSubtitle"
			placeholder="подзаголовок практики"
			bind:value={localValue.subtitle[$locale]}
		/>
	</h2>

	<Input
		id="practiceVideoLink"
		placeholder="Сюда ссылку на видео"
		simple
		bind:value={localValue.videoLink}
	/>

	<TextEditor
		id="practiceDescription"
		placeholder={Placeholder.practice}
		bind:value={localValue.description[$locale]}
	/>
{/if}
