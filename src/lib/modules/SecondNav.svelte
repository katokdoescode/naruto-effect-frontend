<script>
import { page } from '$app/stores';
import ShadowWrapper from '$lib/modules/ShadowWrapper.svelte';
import Switch from '$lib/modules/Switch.svelte';
import Button from '$lib/ui/Button.svelte';
import autoTranslate from '$lib/utils/autoTranslate';
import isLinkActive from '$lib/utils/isLinkActive';
import { getContext } from 'svelte';
import { _, locale, locales } from 'svelte-i18n';

/** @type {Participants} */
export let participants = [];

const authorized = getContext('authorized');
const isEditingState = getContext('isEditingState');
const participantData = getContext('participantData');
const practiceData = getContext('practiceData');
const projectData = getContext('projectData');

let checked = false;

/**
 * Automatically translates name
 * if name was not found on the english version
 *
 * @param {LocaleObject} name
 * @returns {string}
 */
function translateName(name) {
	return $locale === 'en'
		? autoTranslate($locale, name[anotherLocale])
		: name[anotherLocale];
}

$: route = $page.route.id || '';
$: isPracticePage = route?.includes('practices') || '';
$: isParticipantsPage = route?.includes('participants') || '';
$: isProjectsPage = route?.includes('projects') || '';
$: isMainPage = route === '/' || '';
$: isCVPage = route === '/cv';

$: visibleParticipants = participants
	? participants
			.filter(({ isVisible }) => Boolean(isVisible))
			.sort((a, b) => {
				return a.name[$locale] - b.name[$locale]; // Sort participants by localized name [a-z]
			})
	: [];

$: disabledParticipants = participants
	? participants
			.filter(({ isVisible }) => Boolean(!isVisible))
			.sort((a, b) => {
				return a.name[$locale] - b.name[$locale]; // Sort participants by localized name [a-z]
			})
	: [];

$: {
	if (isParticipantsPage) {
		checked = $participantData?.isVisible;
	}

	if (isPracticePage) {
		checked = $practiceData?.isVisible;
	}

	if (isProjectsPage) {
		checked = $projectData?.isVisible;
	}
}

/**
 * @param {{ detail: unknown }} event
 */
function check(event) {
	const { detail } = event;
	if (isPracticePage) {
		practiceData.set({
			...$practiceData,
			isVisible: detail,
		});
	}

	if (isParticipantsPage) {
		participantData.set({
			...$participantData,
			isVisible: detail,
		});
	}

	if (isProjectsPage) {
		projectData.set({
			...$projectData,
			isVisible: detail,
		});
	}
}

$: [anotherLocale] = $locales.filter((loc) => loc !== $locale);
</script>

<nav
	id="second-menu"
	class="second-nav"
	{...$$restProps}>
	{#if $authorized}
		{#if $isEditingState && !isMainPage && !isCVPage}
			<div class="edit-title-wrapper">
				<h2 class="title">{$_('mainMenu.settings')}:</h2>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="checkbox">
					<Switch
						bind:checked
						on:change={check} />
					<span>{$_('mainMenu.settings.publicity')}</span>
				</label>
			</div>
		{:else if !$isEditingState}
			<div class="edit-title-wrapper">
				<h2 class="title">{$_('mainMenu.participants')}:</h2>
				<Button
					color="gray"
					href="/participants/create">
					{$_('button.add')}
				</Button>
			</div>
		{:else}
			<div class="edit-title-wrapper"></div>
		{/if}
	{:else}
		<h2 class="title">{$_('mainMenu.participants')}:</h2>
	{/if}

	{#if !$isEditingState || isMainPage}
		<ShadowWrapper
			noBottom={participants.length <= 3}
			noTop>
			<ul class="links-list">
				{#each visibleParticipants as menuItem}
					<li>
						<a
							class:active={$page.url.pathname.includes(menuItem.slug)}
							class:disabled={!menuItem?.isVisible || false}
							data-sveltekit-keepfocus
							href={`/participants/${menuItem.slug}`}
						>{menuItem.name[$locale] || translateName(menuItem.name)}</a
						>
					</li>
				{/each}
				{#each disabledParticipants as menuItem}
					<li>
						<a
							class="disabled"
							class:active={isLinkActive($page.url.pathname, menuItem.slug)}
							data-sveltekit-keepfocus
							href={`/participants/${menuItem.slug}`}
						>{menuItem.name[$locale] || translateName(menuItem.name)}</a
						>
					</li>
				{/each}
			</ul>
		</ShadowWrapper>
	{/if}
</nav>

<style>
	.second-nav {
		display: flex;
		flex-direction: column;
		padding-top: clamp(60px, 17.5svh, 175px);
	}

	@media (width <=1018px) {
		.second-nav {
			height: 100%;
			padding-top: 40px;
		}
	}

	.second-nav .title {
		margin: 0;
		padding: 0;
		font-size: var(--font-second-menu-heading-size);
		font-weight: var(--font-main-weight);
	}

	.second-nav .links-list {
		display: flex;
		flex-direction: column;
		overflow: auto;
		scroll-behavior: smooth;
		scrollbar-width: none;
		list-style: none;
		padding: 0;
		margin: 0;
		row-gap: 15px;
		min-height: 0;
		height: 100%;
		padding-bottom: 80px;
	}

	.second-nav .links-list::after {
		content: '';
		display: list-item block;
		height: 5em;
		width: 100%;
		flex-shrink: 0;
	}

	.second-nav .links-list li {
		margin: 0;
		font-size: var(--font-panel-second-menu-size);
		font-weight: var(--font-menu-weight);
	}

	.second-nav .links-list a.disabled {
		opacity: 0.5;
	}

	.edit-title-wrapper {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.checkbox {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 11px;
	}

	.checkbox span {
		font-size: var(--font-second-menu-heading-size);
		font-weight: var(--font-menu-weight);
	}
</style>
