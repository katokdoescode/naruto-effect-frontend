<script>
	/* eslint-disable svelte/no-at-html-tags */
	import TextEditor from '$lib/modules/TextEditor.svelte';
	import YouTube from '$lib/modules/YouTube.svelte';
	import Input from '$lib/ui/Input.svelte';
	import Textarea from '$lib/ui/Textarea.svelte';
	import { getContext } from 'svelte';
	import { locale } from 'svelte-i18n';

	const isContentPageEditing = getContext('isContentPageEditing');
	const contentPage = getContext('contentPage');

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

	$: contentPage.set(localValue);
</script>

{#if isEditing}
	<h1 class="main-header">
		<Textarea
			id="contentTitleEditor"
			bind:value={localValue.title[$locale]} />
	</h1>
{:else}
	<h1 class="main-header">{pageData.title[$locale]}</h1>
{/if}

{#if isEditing}
	<Input
		id="contentVideoEditor"
		simple
		bind:value={localValue.videoLink} />
{:else}
	<YouTube link={videoLink} />
{/if}

{#if isEditing}
	<TextEditor
		id="contentPageEditor"
		bind:value={localValue.text[$locale]} />
{:else}
	<article class="main-article">
		{@html pageData.text[$locale]}
	</article>
{/if}
