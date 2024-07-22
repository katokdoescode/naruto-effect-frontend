<script>
/* eslint-disable svelte/no-at-html-tags */
import { BannerModes } from '$lib/constants';
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
	{#if pageData.bannerMode === BannerModes.IMAGE && pageData.banner.link}
		<div class="image-wrapper">
			<img
				alt={pageData.banner.alt}
				height="317"
				src={pageData.banner.link} />
		</div>
	{:else if pageData.bannerMode === BannerModes.VIDEO && pageData.iframe}
		<YouTube markup={pageData.iframe} />
	{/if}
	<article class="main-article">
		{@html pageData?.text[$locale] || ''}
	</article>
{/if}

<style scoped>
	.image-wrapper {
		width: fit-content;
	}

	.image-wrapper img {
		height: 317px;
		width: 100%;
		object-fit: contain;
	}
</style>
