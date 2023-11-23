<script>
	/* eslint-disable svelte/no-at-html-tags */
	import { Placeholder } from '$lib/constants/index.js';
	import TextEditor from '$lib/modules/TextEditor.svelte';
	import YouTube from '$lib/modules/YouTube.svelte';
	import Input from '$lib/ui/Input.svelte';
	import Textarea from '$lib/ui/Textarea.svelte';
	import { clean } from '$lib/utils/objectCleaner.js';
	import { CarSlugger } from '@katokdoescode/car-slugger';
	import { getContext } from 'svelte';
	import { locale } from 'svelte-i18n';

	const practiceData = getContext('practiceData');
	const isEditingState = getContext('isEditingState');

	const slugger = new CarSlugger();

	export let data;

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
</script>

{#if $isEditingState}
	<h1 class="main-header">
		<Textarea
			id="practiceTitle"
			bind:value={localValue.title[$locale]} />
	</h1>
	<h2 class="main-header">
		<Textarea
			id="practiceSubtitle"
			bind:value={localValue.subtitle[$locale]} />
	</h2>

	<Input
		id="practiceVideo"
		simple
		bind:value={localValue.videoLink} />

	<TextEditor
		id="practiceEditor"
		placeholder={Placeholder.practice}
		bind:value={localValue.description[$locale]}
	/>
{:else}
	<h1 class="main-header">{practice.title[$locale]}</h1>
	<h2 class="main-header">{practice.subtitle[$locale]}</h2>

	<YouTube link={practice.videoLink} />

	<article class="main-article">
		{@html practice.description[$locale]}
	</article>
{/if}
