<script>
import AlertMessage from '$lib/modules/AlertMessage.svelte';
import ProjectEditor from '$lib/modules/hokage/ProjectEditor.svelte';
import autoTranslate from '$lib/utils/autoTranslate';
import { clean } from '$lib/utils/objectsTools';
import { getContext } from 'svelte';
import { _, locale, locales } from 'svelte-i18n';
export let data;

const isEditingState = getContext('isEditingState');
const authorized = getContext('authorized');
const projectData = getContext('projectData');

$: [anotherLocale] = $locales.filter((loc) => loc !== $locale);

/** @type {Project} */
$: project = data?.project;

/** @type {Project} */
$: localValue = project;

$: projectData.set(clean(localValue));

$: isNotLocalized = !project.name[$locale];

$: autoTranslatedName =
	isNotLocalized && $locale === 'en'
		? autoTranslate($locale, project.name[anotherLocale])
		: project.name[anotherLocale];
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
{#if data.project}
  {#if $isEditingState && $authorized}
    <ProjectEditor bind:localValue />
  {:else if isNotLocalized}
  <div class="wrapper">
		<h1>{autoTranslatedName}</h1>
		<h2>{project.title[$locale] || project.title[anotherLocale]}</h2>
		<div class="alert">
			<AlertMessage
				message={$_('messages.anotherLanguageOnly')}
				tag="p" />
		</div>
	</div>
	<article class="main-article">
		{@html project.description[anotherLocale]}
	</article>
  {:else}
  <a href="/projects">← {$_('projects.projects')}</a>
  <h1>{data.project.name[$locale]}</h1>
  <h2>{data.project.title[$locale]}</h2>

  <article>
    {@html data.project.description[$locale]}
  </article>
  {/if}
{/if}
