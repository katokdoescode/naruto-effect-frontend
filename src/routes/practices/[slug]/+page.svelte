<script>
/* eslint-disable svelte/no-at-html-tags */
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { BannerModes } from '$lib/constants';
import AlertMessage from '$lib/modules/AlertMessage.svelte';
import YouTube from '$lib/modules/YouTube.svelte';
import PracticeEditor from '$lib/modules/hokage/PracticeEditor.svelte';
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
import { practices } from '$lib/stores/practicesPageStore';
import autoTranslate from '$lib/utils/autoTranslate.js';
import { clean } from '$lib/utils/objectsTools.js';
import { deletePage, savePage } from '$lib/utils/pagesActions';
import { CarSlugger } from '@katokdoescode/car-slugger';
import { onMount } from 'svelte';
import { _, locale, locales } from 'svelte-i18n';
const slugger = new CarSlugger();

export let data;
let isMounted = false;

$: [anotherLocale] = $locales.filter((loc) => loc !== $locale);

/** @type {Practice} */
$: practice = data?.practice;

/** @type {Practice} */
$: localValue = data?.practice;

$: entityVisibility?.set(localValue.isVisible);

$: if (localValue) {
	Object.entries(localValue.title).forEach(([key, value]) => {
		if (value) localValue.slug[key] = slugger.getSlug(localValue.title[key]);
	});
}

$: localizedSlug = practice?.originalSlug[$locale] || undefined;
$: route = $page.params.slug;
$: if (isMounted && localizedSlug && route !== localizedSlug) {
	goto(`/practices/${localizedSlug}`, { replaceState: false });
}

$: isNotLocalized = !practice.title[$locale];

$: autoTranslatedTitle =
	isNotLocalized && $locale === 'en'
		? autoTranslate($locale, practice.title[anotherLocale])
		: practice.title[anotherLocale];

function updateLocalData() {
	practice = data?.practice;
	localValue = data?.practice;
}

onMount(() => {
	const unsubscribe = needSave.subscribe(async (save) => {
		if (!save) return;

		const response = await savePage(clean(localValue), {
			route: '/api/practices',
			method: 'PATCH',
		});

		if (response) {
			for (const key in data.practices) {
				if ($practices[key].id === response.id) {
					practices.update((practices) =>
						practices.map((practice) =>
							practice.id === response.id ? response : practice,
						),
					);
				}
			}

			canNavigate.set(true);
			needSave.set(false);
			isEditingState.set(false);
			goto(`/practices/${response.slug[$locale]}`);
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
							practices.set(
								$practices.filter(
									({ slug }) => slug[$locale] !== localValue.slug[$locale],
								),
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

	isMounted = true;
	canNavigate.set(false);

	return () => {
		unsubscribe();
		unsubscribeCancel();
		unsubscribeDelete();
		unsubscribeEntityVisibility();
		isEditingState.set(false);
		canNavigate.set(false);
	};
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
			<h1>{autoTranslatedTitle}</h1>
			<h2>{practice.subtitle[$locale] || practice.subtitle[anotherLocale]}</h2>
			<div class="alert">
				<AlertMessage message={$_('messages.anotherLanguageOnly')} />
			</div>
		</div>
	{:else}
		<h1>{practice.title[$locale]}</h1>
		<h2>{practice.subtitle[$locale]}</h2>
	{/if}

	{#if practice.bannerMode === BannerModes.IMAGE && practice.banner.link}
		<div class="image-wrapper">
			<img
				alt={practice.banner.alt}
				height="317"
				src={practice.banner.link} />
		</div>
	{:else if practice.bannerMode === BannerModes.VIDEO && practice.iframe}
		<YouTube markup={practice.iframe} />
	{/if}

	<article class="main-article">
		{#if isNotLocalized}
			{@html practice.description[anotherLocale]}
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

	.image-wrapper {
		width: fit-content;
	}

	.image-wrapper img {
		height: 317px;
		width: 100%;
		object-fit: contain;
	}
</style>
