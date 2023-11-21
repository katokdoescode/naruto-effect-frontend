<script>
	import TextEditor from '$lib/modules/TextEditor.svelte';
	import YouTube from '$lib/modules/YouTube.svelte';
	import { getContext } from 'svelte';
	import { locale } from 'svelte-i18n';

	const isContentPageEditing = getContext('isContentPageEditing');
	const contentPage = getContext('contentPage');

	let lang;
	locale.subscribe((l) => (lang = l));

	/* eslint-disable svelte/no-at-html-tags */
	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {MainPageData} */
	const pageData = data?.pageData;

	const videoLink = pageData?.videoLink;

	let isEditing = false;
	isContentPageEditing.subscribe((x) => {
		isEditing = x;
	});

	contentPage.set(pageData);

	let localValue = pageData;

	$: if (isEditing) contentPage.set(pageData);
</script>

<h1 class="main-header">{pageData.title[lang]}</h1>
<YouTube link={videoLink} />

{#if isEditing}
	<TextEditor
		id="contentPageEditor"
		bind:value={localValue.text[lang]} />
{:else}
	<article class="main-article">
		{@html pageData.text[lang]}
	</article>
{/if}
