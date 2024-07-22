<script>
/* eslint-disable svelte/no-at-html-tags */
import AlertMessage from '$lib/modules/AlertMessage.svelte';
import ParticipantEditor from '$lib/modules/hokage/ParticipantEditor.svelte';
import autoTranslate from '$lib/utils/autoTranslate.js';
import { clean } from '$lib/utils/objectsTools.js';
import { CarSlugger } from '@katokdoescode/car-slugger';
import { getContext } from 'svelte';
import { _, locale, locales } from 'svelte-i18n';

const isEditingState = getContext('isEditingState');
const authorized = getContext('authorized');
const participantData = getContext('participantData');

const slugger = new CarSlugger();

export let data;

$: [anotherLocale] = $locales.filter((loc) => loc !== $locale);

/** @type {Participant} */
$: participant = data?.participant;

/** @type{Participant} */
$: localValue = participant;

$: localValue.slug = Object.values(localValue.name).find(Boolean)
	? slugger.getSlug(Object.values(localValue.name).find(Boolean))
	: '';

$: participantData.set(clean(localValue));

$: isNotLocalized = !participant.name[$locale];

$: autoTranslatedName =
	isNotLocalized && $locale === 'en'
		? autoTranslate($locale, participant.name[anotherLocale])
		: participant.name[anotherLocale];
</script>

<svelte:head>
	{#if $authorized && $isEditingState}
		<title>Editing participant: {participant.name[$locale]}</title>
	{:else}
		<title>{participant.name[$locale]}</title>
	{/if}

	<meta
		name="description"
		content={participant.title[$locale]} />
</svelte:head>

{#if $authorized && $isEditingState}
	<ParticipantEditor bind:localValue />
{:else if isNotLocalized}
	<div class="wrapper">
		<h1>{autoTranslatedName}</h1>
		<h2>{participant.title[$locale] || participant.title[anotherLocale]}</h2>
		<div class="alert">
			<AlertMessage
				message={$_('messages.anotherLanguageOnly')}
				tag="p" />
		</div>
	</div>
	<article class="main-article">
		{@html participant.description[anotherLocale]}
	</article>
{:else}
	<h1>{participant.name[$locale]}</h1>
	<h2>{participant.title[$locale]}</h2>
	<article class="main-article">
		{@html participant.description[$locale]}
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
