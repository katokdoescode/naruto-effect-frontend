<script>
import { afterNavigate, goto } from '$app/navigation';
/* eslint-disable svelte/no-at-html-tags */
import AlertMessage from '$lib/modules/AlertMessage.svelte';
import ParticipantEditor from '$lib/modules/hokage/ParticipantEditor.svelte';
import {
	canNavigate,
	isEditingState,
	needCancel,
	needDelete,
	needSave,
} from '$lib/stores/appStore';
import { authorized } from '$lib/stores/authStore';
import { entityVisibility } from '$lib/stores/entityVisibilityStore';
import {
	deleteModalDecision,
	isShowDeleteModal,
} from '$lib/stores/modalsStore';
import { participants } from '$lib/stores/participantsPageStore';
import autoTranslate from '$lib/utils/autoTranslate.js';
import { clean } from '$lib/utils/objectsTools.js';
import { deletePage, savePage } from '$lib/utils/pagesActions';
import { CarSlugger } from '@katokdoescode/car-slugger';
import { onMount } from 'svelte';
import { _, locale, locales } from 'svelte-i18n';

const slugger = new CarSlugger();

export let data;

$: [anotherLocale] = $locales.filter((loc) => loc !== $locale);

/** @type {Participant} */
let participant = data?.participant;
let localValue = structuredClone(participant);

$: entityVisibility?.set(localValue.isVisible);

$: localValue.slug = Object.values(localValue.name).find(Boolean)
	? slugger.getSlug(Object.values(localValue.name).find(Boolean))
	: '';

$: isNotLocalized = !participant.name[$locale];

$: autoTranslatedName =
	isNotLocalized && $locale === 'en'
		? autoTranslate($locale, participant.name[anotherLocale])
		: participant.name[anotherLocale];

function updateLocalData() {
	participant = data?.participant;
	localValue = structuredClone(participant);
}

onMount(() => {
	updateLocalData();
	const unsubscribe = needSave.subscribe(async (save) => {
		if (!save) return;

		const response = await savePage(clean(localValue), {
			route: '/api/participants',
			method: 'PATCH',
		});

		if (response) {
			localValue = response;

			for (const key in data.participants) {
				if ($participants[key].id === localValue.id) {
					participants.update((participants) =>
						participants.map((participant) =>
							participant.id === localValue.id ? localValue : participant,
						),
					);
				}
			}
			canNavigate.set(true);
			needSave.set(false);
			isEditingState.set(false);
			goto(`/participants/${localValue.slug}`);
		}
	});

	const unsubscribeCancel = needCancel.subscribe(async (cancel) => {
		if (!cancel) return;
		updateLocalData();
		needCancel.set(false);
		isEditingState.set(false);
	});

	const unsubscribeDelete = needDelete.subscribe(async (doDelete) => {
		if (!doDelete) return;
		isShowDeleteModal.set(true);
		let unsubscribeDeleteModal = () => null;

		await (() =>
			new Promise(() => {
				unsubscribeDeleteModal = deleteModalDecision.subscribe(async (d) => {
					const decision = await d;

					if (decision) {
						const response = await deletePage(localValue, {
							route: '/api/participants',
							method: 'DELETE',
						});

						if (response) {
							participants.set(
								$participants.filter(({ slug }) => slug !== localValue.slug),
							);
							canNavigate.set(true);
							goto('/');
						}
					}
					needDelete.set(false);
				});
			}))();

		unsubscribeDeleteModal();
	});

	const unsubscribeEntityVisibility = entityVisibility.subscribe(
		(visibility) => {
			localValue.isVisible = visibility;
		},
	);

	return () => {
		unsubscribe();
		unsubscribeCancel();
		unsubscribeDelete();
		unsubscribeEntityVisibility();
	};
});

afterNavigate(() => {
	updateLocalData();
	isEditingState.set(false);
	canNavigate.set(false);
});
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
