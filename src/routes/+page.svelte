<script>
	/* eslint-disable svelte/no-at-html-tags */
	import YouTube from '$lib/modules/YouTube.svelte';
	import PageEditor from '$lib/modules/hokage/PageEditor.svelte';

	import { beforeNavigate, goto } from '$app/navigation';
	import { getContext } from 'svelte';
	import { locale } from 'svelte-i18n';

	const isEditingState = getContext('isEditingState');
	const contentPage = getContext('contentPage');

	export let data;

	/** @type {string}*/
	let whereToGo;
	let canNavigate = false;

	/** @type {MainPageData} */
	const pageData = data?.pageData;

	contentPage.set(pageData);

	let localValue = pageData;

	$: contentPage.set(localValue);

	const isShowConfirmExitModal = getContext('isShowConfirmExitModal');
	const confirmModalDecision = getContext('confirmModalDecision');

	confirmModalDecision.subscribe(async (decision) => {
		const d = await decision;
		if (whereToGo) {
			if (d) {
				canNavigate = true;
				goto(whereToGo);
			} else {
				canNavigate = true;
				goto(whereToGo);
			}
		}
	});

	beforeNavigate(async (event) => {
		if (!canNavigate && $isEditingState) {
			event.cancel();
			whereToGo = event.to.url.href;
			isShowConfirmExitModal.set(true);
		}
	});
</script>

{#if $isEditingState}
	<PageEditor bind:localValue />
{:else}
	<h1>{pageData?.title[$locale] || ''}</h1>
	<YouTube link={pageData?.videoLink || ''} />
	<article class="main-article">
		{@html pageData?.text[$locale] || ''}
	</article>
{/if}
