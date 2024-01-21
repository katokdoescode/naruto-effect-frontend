<script>
	/* eslint-disable svelte/no-at-html-tags */
	import PageEditor from '$lib/modules/hokage/PageEditor.svelte';

	import { beforeNavigate, goto } from '$app/navigation';
	import { getContext } from 'svelte';
	import { locale } from 'svelte-i18n';

	const isEditingState = getContext('isEditingState');
	const cvPage = getContext('cvPage');

	/* eslint-disable svelte/no-at-html-tags */
	export let data;

	/** @type{CvData} */
	let cvData = data?.cvData || undefined;

	/** @type {string}*/
	let whereToGo;
	let canNavigate = false;

	cvPage.set(cvData);

	let localValue = cvData;

	$: cvPage.set(localValue);

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
	<h1>{cvData?.title[$locale] || ''}</h1>
	<article class="main-article">
		{@html cvData?.text[$locale] || ''}
	</article>
{/if}
