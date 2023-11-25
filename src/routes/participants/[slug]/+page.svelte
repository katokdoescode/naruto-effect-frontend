<script>
	/* eslint-disable svelte/no-at-html-tags */
	import ParticipantEditor from '$lib/modules/hokage/ParticipantEditor.svelte';
	import { clean } from '$lib/utils/objectsTools.js';
	import { CarSlugger } from '@katokdoescode/car-slugger';
	import { getContext } from 'svelte';
	import { locale } from 'svelte-i18n';

	export let data;

	/** @type {Participant} */
	let participant = data?.participant;

	const isEditingState = getContext('isEditingState');
	const authorized = getContext('authorized');
	const participantData = getContext('participantData');

	const slugger = new CarSlugger();

	/** @type{Participant} */
	let localValue = participant;

	$: localValue.slug = Object.values(localValue.name).find(Boolean)
		? slugger.getSlug(Object.values(localValue.name).find(Boolean))
		: '';

	$: participantData.set(clean(localValue));
</script>

{#if $authorized && $isEditingState}
	<ParticipantEditor bind:localValue />
{:else}
	<h1>{participant.name[$locale]}</h1>
	<h2>{participant.title[$locale]}</h2>
	<article class="main-article">
		{@html participant.description[$locale]}
	</article>
{/if}
