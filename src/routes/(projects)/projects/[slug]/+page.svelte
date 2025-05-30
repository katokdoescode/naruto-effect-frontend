<script>
import { goto } from '$app/navigation';
import AlertMessage from '$lib/modules/AlertMessage.svelte';
import ProjectEditor from '$lib/modules/hokage/ProjectEditor.svelte';
import {
	canNavigate,
	isDataValid,
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
import { projects } from '$lib/stores/projectsStore';
import autoTranslate from '$lib/utils/autoTranslate';
import { clean } from '$lib/utils/objectsTools';
import { deletePage, savePage } from '$lib/utils/pagesActions';
import { validateProject } from '$lib/utils/validation/validateProject';
import { onMount } from 'svelte';
import { _, locale, locales } from 'svelte-i18n';
export let data;

$: [anotherLocale] = $locales.filter((loc) => loc !== $locale);
/** @type {Project} */
$: localValue = data?.project;

$: entityVisibility?.set(localValue.isVisible);
$: isNotLocalized = !localValue.name[$locale];

$: autoTranslatedName =
	isNotLocalized && $locale === 'en'
		? autoTranslate($locale, localValue.name[anotherLocale])
		: localValue.name[anotherLocale];

$: isDataValid?.set(validateProject(localValue, $locale));

onMount(() => {
	const unsubscribe = needSave.subscribe(async (save) => {
		if (!save) return;

		const response = await savePage(clean(localValue), {
			route: '/api/projects',
			method: 'PATCH',
		});

		if (response) {
			data.project = response;
			localValue = response;

			projects.update((projects) =>
				projects.map((project) =>
					project.id === response.id ? response : project,
				),
			);

			canNavigate.set(true);
			needSave.set(false);
			isEditingState.set(false);
			goto(`/projects/${response.slug}`);
		}
	});

	const unsubscribeCancel = needCancel.subscribe(async (cancel) => {
		if (!cancel) return;
		localValue = data?.project;
		needCancel.set(false);
		isEditingState.set(false);
		canNavigate.set(true);
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
							route: '/api/projects',
							method: 'DELETE',
						});

						if (response) {
							projects.update((projects) =>
								projects.filter(({ id }) => id !== localValue.id),
							);
							needDelete.set(false);
							isEditingState.set(false);
							canNavigate.set(true);
							goto('/projects');
						}
					}
				});
			}))();

		unsubscribeDeleteModal();
	});

	const unsubscribeEntityVisibility = entityVisibility.subscribe(
		(visibility) => {
			localValue.isVisible = visibility;
		},
	);

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
  {#if data.project}
    {#if $isEditingState && $authorized}
        <title>{$_('projects.editing')} | {data.project.name[$locale]}</title>
      {:else if isNotLocalized}
        <title>{$_('projects.editing')} | {autoTranslatedName}</title>
      {:else}
      <title>{data.project.name[$locale]}</title>
    {/if}
  {/if}
</svelte:head>
{#if localValue}
  {#if $isEditingState && $authorized}
    <ProjectEditor bind:localValue />
  {:else if isNotLocalized}
  <div class="wrapper">
		<h1>{autoTranslatedName}</h1>
		<h2>{localValue.title[$locale] || localValue.title[anotherLocale]}</h2>
		<div class="alert">
			<AlertMessage
				message={$_('messages.anotherLanguageOnly')}
				tag="p" />
		</div>
	</div>
	<article class="main-article">
		{@html localValue.description[anotherLocale]}
	</article>
  {:else}
  <a href="/projects">← {$_('projects.projects')}</a>
  <h1>{localValue.name[$locale]}</h1>
  <h2>{localValue.title[$locale]}</h2>

  <article>
    {@html localValue.description[$locale]}
  </article>
  {/if}
{/if}
