<script>
	/* eslint-disable svelte/no-at-html-tags */
	import TextEditor from '$lib/modules/TextEditor.svelte';
	import YouTube from '$lib/modules/YouTube.svelte';
	import Input from '$lib/ui/Input.svelte';
	import Textarea from '$lib/ui/Textarea.svelte';
	import { getContext } from 'svelte';
	import { locale } from 'svelte-i18n';

	const isEditingState = getContext('isEditingState');
	const contentPage = getContext('contentPage');

	export let data;

	/** @type {MainPageData} */
	const pageData = data?.pageData;

	contentPage.set(pageData);

	let localValue = pageData;

	$: contentPage.set(localValue);
</script>

{#if $isEditingState}
	<h1 class="main-header">
		<Textarea
			id="contentTitleEditor"
			bind:value={localValue.title[$locale]} />
	</h1>
	<Input
		id="contentVideoEditor"
		simple
		bind:value={localValue.videoLink} />
	<TextEditor
		id="contentPageEditor"
		bind:value={localValue.text[$locale]} />
{:else}
	<h1 class="main-header">{pageData?.title[$locale] || ''}</h1>
	<YouTube link={pageData?.videoLink || ''} />
	<article class="main-article">
		{@html pageData?.text[$locale] || ''}
	</article>
{/if}
