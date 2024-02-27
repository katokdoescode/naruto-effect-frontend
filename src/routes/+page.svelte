<script>
	/* eslint-disable svelte/no-at-html-tags */
	import YouTube from '$lib/modules/YouTube.svelte';
	import PageEditor from '$lib/modules/hokage/PageEditor.svelte';

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

<svelte:head>
	{#if $isEditingState}
		<title>Main page data: {pageData?.title[$locale] || ''}</title>
	{:else}
		<title>{pageData?.title[$locale] || ''}</title>
	{/if}

	<meta
		name="description"
		content={pageData?.description[$locale] || ''} />
</svelte:head>

{#if $isEditingState}
	<PageEditor bind:localValue />
{:else}
	<h1>{pageData?.title[$locale] || ''}</h1>
	<YouTube link={pageData?.videoLink || ''} />
	<article class="main-article">
		{@html pageData?.text[$locale] || ''}
	</article>
{/if}
