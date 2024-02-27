<script>
	/* eslint-disable svelte/no-at-html-tags */
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import YouTube from '$lib/modules/YouTube.svelte';
	import PracticeEditor from '$lib/modules/hokage/PracticeEditor.svelte';
	import { clean } from '$lib/utils/objectsTools.js';
	import { CarSlugger } from '@katokdoescode/car-slugger';
	import { getContext, onMount } from 'svelte';
	import { locale } from 'svelte-i18n';

	const authorized = getContext('authorized');
	const practiceData = getContext('practiceData');
	const isEditingState = getContext('isEditingState');

	const slugger = new CarSlugger();

	export let data;
	let isMounted = false;

	/** @type {Practice} */
	$: practice = data?.practice;

	/** @type{Practice} */
	let localValue;
	$: localValue = practice;

	$: if (localValue)
		Object.entries(localValue.title).forEach(([key, value]) => {
			if (value) localValue.slug[key] = slugger.getSlug(localValue.title[key]);
		});

	$: practiceData.set(clean(localValue));
	$: localizedSlug = practice?.originalSlug[$locale] || undefined;
	$: route = $page.params.slug;
	$: if (isMounted && route !== localizedSlug) {
		if (localizedSlug)
			goto(`/practices/${localizedSlug}`, { replaceState: false });
	}

	onMount(() => {
		isMounted = true;
	});
</script>

<svelte:head>
	{#if $authorized && $isEditingState}
		<title>Editing practice: {practice.title[$locale]}</title>
	{:else}
		<title>{practice.title[$locale]}</title>
	{/if}

	<meta
		name="description"
		content={practice.subtitle[$locale]} />
</svelte:head>

{#if $authorized && $isEditingState}
	<PracticeEditor bind:localValue />
{:else}
	<h1>{practice.title[$locale]}</h1>
	<h2>{practice.subtitle[$locale]}</h2>

	<YouTube link={practice.videoLink} />

	<article class="main-article">
		{@html practice.description[$locale]}
	</article>
{/if}
