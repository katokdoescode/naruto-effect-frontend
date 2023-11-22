<script>
	import TextEditor from '$lib/modules/TextEditor.svelte';
	import YouTube from '$lib/modules/YouTube.svelte';
	import { getContext } from 'svelte';
	import { locale } from 'svelte-i18n';

	const isContentPageEditing = getContext('isContentPageEditing');
	const contentPage = getContext('contentPage');

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

{#if isEditing}
	<h1 class="main-header">
		<TextEditor
			id="contentTitleEditor"
			inline
			bind:value={localValue.title[$locale]}
		/>
	</h1>
{:else}
	<h1 class="main-header">{pageData.title[$locale]}</h1>
{/if}

{#if isEditing}
	<TextEditor
		id="contentVideoEditor"
		inline
		bind:value={localValue.videoLink}
	/>
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
