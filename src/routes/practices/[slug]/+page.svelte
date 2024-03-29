<script>
	/* eslint-disable svelte/no-at-html-tags */
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import AlertMessage from '$lib/modules/AlertMessage.svelte';
	import YouTube from '$lib/modules/YouTube.svelte';
	import PracticeEditor from '$lib/modules/hokage/PracticeEditor.svelte';
	import { clean } from '$lib/utils/objectsTools.js';
	import { CarSlugger } from '@katokdoescode/car-slugger';
	import { getContext, onMount } from 'svelte';
	import { _, locale, locales } from 'svelte-i18n';

	const authorized = getContext('authorized');
	const practiceData = getContext('practiceData');
	const isEditingState = getContext('isEditingState');

	const slugger = new CarSlugger();

	export let data;
	let isMounted = false;

	function getAnotherLocale() {
		const [anotherLocale] = $locales.filter((loc) => loc !== $locale);
		return anotherLocale;
	}

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

	$: isNotLocalized = !!(
		!practice.title[$locale] || !practice.subtitle[$locale]
	);

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
	{#if isNotLocalized}
		<div class="wrapper">
			<h1>{practice.title[getAnotherLocale()]}</h1>
			<h2>{practice.subtitle[getAnotherLocale()]}</h2>
			<div class="alert">
				<AlertMessage
					message={$_('messages.anotherLanguageOnly')}
					tag="p" />
			</div>
		</div>
	{:else}
		<h1>{practice.title[$locale]}</h1>
		<h2>{practice.subtitle[$locale]}</h2>
	{/if}

	<YouTube link={practice.videoLink} />

	<article class="main-article">
		{#if isNotLocalized}
			{@html practice.description[getAnotherLocale()]}
		{:else}
			{@html practice.description[$locale]}
		{/if}
	</article>
{/if}

<style scoped>
	.wrapper {
		display: flex;
		flex-direction: column;
	}

	.wrapper h1 {
		order: 1;
	}

	.wrapper h2 {
		order: 3;
	}

	.alert {
		order: 2;
		margin-bottom: 20px;
	}
</style>
