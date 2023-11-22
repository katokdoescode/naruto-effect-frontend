<script>
	import { Placeholder } from '$lib/constants';
	import TextEditor from '$lib/modules/TextEditor.svelte';
	import Input from '$lib/ui/Input.svelte';
	import Textarea from '$lib/ui/Textarea.svelte';
	import { getContext, setContext } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { writable } from 'svelte/store';

	const isContentPageEditing = getContext('isContentPageEditing');
	const contentPageStatus = getContext('contentPageStatus');
	const authorized = getContext('authorized');

	const practiceCreationStatus = writable();
	const isPracticeEditing = writable();
	const practiceTitle = writable();
	const practiceSubtitle = writable();
	const practiceDescription = writable();
	const practiceLink = writable();

	setContext('practiceCreationStatus', practiceCreationStatus);
	setContext('isPracticeEditing', isPracticeEditing);
	setContext('practiceTitle', practiceTitle);
	setContext('practiceSubtitle', practiceSubtitle);
	setContext('practiceDescription', practiceDescription);
	setContext('practiceLink', practiceLink);

	isContentPageEditing.set(true);
	contentPageStatus.set(null);

	/** @type{Practice} */
	let localValue = {
		id: null,
		name: { en: '', ru: '' },
		slug: { en: '', ru: '' },
		title: { en: '', ru: '' },
		subtitle: { en: '', ru: '' },
		videoLink: '',
		description: { en: '', ru: '' },
		records: []
	};
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
