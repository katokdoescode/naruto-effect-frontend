<script>
/* eslint-disable svelte/no-at-html-tags */
import { BannerModes } from '$lib/constants';
import YouTube from '$lib/modules/YouTube.svelte';
import MainPageEditor from '$lib/modules/hokage/MainPageEditor.svelte';
import {
	canNavigate,
	isEditingState,
	needCancel,
	needSave,
} from '$lib/stores/appStore';
import { savePage } from '$lib/utils/pagesActions';
import { onMount } from 'svelte';
import { locale } from 'svelte-i18n';
export let data;

/** @type {MainPageData} */
const pageData = data?.pageData;

let localValue = structuredClone(pageData);

onMount(() => {
	const unsubscribe = needSave.subscribe(async (save) => {
		if (!save) return;

		const response = await savePage(localValue, {
			route: '/api/mainPage',
			method: 'PATCH',
		});

		if (response) {
			localValue = response;
			isEditingState.set(false);
			needSave.set(false);
		}
	});

	const unsubscribeCancel = needCancel.subscribe(async (cancel) => {
		if (!cancel) return;

		localValue = structuredClone(pageData);
		needCancel.set(false);
		isEditingState.set(false);
	});

	canNavigate.set(false);

	return () => {
		unsubscribe();
		unsubscribeCancel();
		canNavigate.set(false);
		isEditingState.set(false);
	};
});
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
	<MainPageEditor bind:localValue />
{:else}
	<h1>{localValue?.title[$locale] || ''}</h1>
	{#if localValue.bannerMode === BannerModes.IMAGE && localValue.banner.link}
		<div class="image-wrapper">
			<img
				alt={localValue.banner.alt}
				height="317"
				src={localValue.banner.link} />
		</div>
	{:else if localValue.bannerMode === BannerModes.VIDEO && localValue.iframe}
		<YouTube markup={localValue.iframe} />
	{/if}
	<article class="main-article">
		{@html localValue?.text[$locale] || ''}
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
