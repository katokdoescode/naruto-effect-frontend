<script>
import { beforeNavigate, goto, replaceState } from '$app/navigation';
import { page } from '$app/stores';
import { setupTokenRefresh } from '$lib/auth';
import AudioPlayer from '$lib/modules/AudioPlayer.svelte';
import Content from '$lib/modules/Content.svelte';
import CookieModal from '$lib/modules/CookieModal.svelte';
import FavIcons from '$lib/modules/FavIcons.svelte';
import Login from '$lib/modules/Login.svelte';
import MainPanel from '$lib/modules/MainPanel.svelte';
import MobileHeader from '$lib/modules/MobileHeader.svelte';
import SecondaryPanel from '$lib/modules/SecondaryPanel.svelte';
import FooterEditor from '$lib/modules/hokage/FooterEditor.svelte';
import ConfirmDelete from '$lib/modules/hokage/modals/ConfirmDelete.svelte';
import ConfirmExit from '$lib/modules/hokage/modals/ConfirmExit.svelte';
import {
	canNavigate,
	combo,
	isEditingState,
	needSave,
} from '$lib/stores/appStore';
import { authorized } from '$lib/stores/authStore';
import {
	confirmExitModalDecision,
	isShowConfirmExitModal,
} from '$lib/stores/modalsStore';
import { participants } from '$lib/stores/participantsPageStore';
import { practices } from '$lib/stores/practicesPageStore';
import { handleKeydown, handleKeyup } from '$lib/utils/keyboardHandler';
import { onMount } from 'svelte';
import { locale } from 'svelte-i18n';

/** @type {MainLayoutData} */
export let data;
/** @type {string}*/
let whereToGo;
let open = false;
let footerEditor;
let projects = data?.projects || [];
let pageLinks = data?.pageData?.pageLinks || [];
let loginPhrase = data?.loginPhrase || undefined;
let pageDataObject = data?.pageData || null;

$: firstTwoLinks = pageLinks?.slice(0, 2);
$: lastLink = pageLinks?.slice(2, 3)[0];

participants.set(data?.participants || []);
practices.set(data?.practices || []);
/**
 * Control authorization data
 * @param {boolean} state
 */
async function authorize(state) {
	authorized.set(state);
	combo.set(false);

	if (state) closeLoginModal();
	else isEditingState.set(false);

	await fetch('/api/practices')
		.then((res) => res.json())
		.then((data) => {
			if (!data.success) {
				// eslint-disable-next-line no-console
				console.error(data.errorMessage);
			} else {
				practices.set(data.data);
			}
		});

	await fetch('/api/participants')
		.then((res) => res.json())
		.then((data) => {
			if (!data.success) {
				// eslint-disable-next-line no-console
				console.error(data.errorMessage);
			} else {
				participants.set(data.data);
			}
		});

	cleanAddressLine();
}

/**
 * Update data in page data array
 * @param {CustomEvent&{detail: {method: string, data: Participant|Practice}}} update
 */
function updateData(update) {
	const { method, data } = update.detail;

	const methods = {
		/** @param {Practice} data */
		updatePractices: (data) => {
			practices.update((practices) =>
				practices.map((practice) =>
					practice.id === data.id ? data : practice,
				),
			);
		},
		/** @param {Participant} data */
		updateParticipants: (data) => {
			participants.update((participants) =>
				participants.map((participant) =>
					participant.id === data.id ? data : participant,
				),
			);
		},
		/** @param {Project} data */
		updateProjects: (data) => {
			projects = projects.map((project) =>
				project.id === data.id ? data : project,
			);
		},
	};

	methods[method](data);
}

function updatePageData({ detail }) {
	pageDataObject = detail;
	pageLinks = detail.pageLinks;
}

function cleanAddressLine() {
	// Remove hash after successful login
	replaceState('/', $page.state);
}

function closeLoginModal() {
	combo.set(false);
	open = false;
	// Remove hash after successful login
	cleanAddressLine();
}

function logoController() {
	const idx = localStorage.getItem('logoIdx');
	const logoIdx = idx ? Number(idx) : 0;
	const newIdx = logoIdx < 10 ? logoIdx + 1 : 1;
	localStorage.setItem('logoIdx', newIdx.toString());
}

function initHandlers() {
	window.addEventListener('keydown', (e) => combo.set(handleKeydown(e)));
	window.addEventListener('keyup', handleKeyup);
}

function readAnchorTag() {
	const { search } = $page.url;

	if (!search || !loginPhrase) return;
	if (search === `?${loginPhrase}`) {
		open = true;
	}
}

function submitFooter() {
	footerEditor.submit();
}

$: open = false;
$: authorized.set(data?.authorized || false);
$: readAnchorTag();

beforeNavigate(async (event) => {
	if (!$canNavigate && $isEditingState) {
		event.cancel();
		whereToGo = event.to.url?.href;
		isShowConfirmExitModal.set(true);
	} else {
		canNavigate.set(false);
		isEditingState.set(false);
		whereToGo = undefined;
	}
});

onMount(() => {
	const settedLocale = localStorage.getItem('userLang');
	if (settedLocale) locale.set(settedLocale);

	const unsubscribeLocale = locale.subscribe((lang) => {
		document.querySelector('html').lang = lang;
		localStorage.setItem('userLang', lang);
		document.cookie = `lang=${lang}; path=/`;
	});

	const unsubscribeConfirmExitModalDecision =
		confirmExitModalDecision.subscribe(async (d) => {
			const decision = await d;

			if (decision === undefined) return;

			if (whereToGo) {
				needSave.set(decision);
				canNavigate.set(true);
				goto(whereToGo);
			}
		});

	const unsubscribeCombo = combo.subscribe((combo) => {
		if (combo) open = true;
	});

	const cleanup = setupTokenRefresh();
	initHandlers();
	logoController();

	return () => {
		unsubscribeLocale();
		unsubscribeConfirmExitModalDecision();
		unsubscribeCombo();
		if (cleanup) cleanup();
	};
});
</script>

<svelte:head>
	{#if $authorized}
		<script src="/scripts/tinymce/tinymce.min.js"></script>
	{/if}
</svelte:head>

<FavIcons />
<AudioPlayer
	id="audio-player"
	src="/audio/ne.mp3"
/>
<div class="screen main-layout">
	<MainPanel
		pageLinks={firstTwoLinks}
		practices={$practices} />

	<MobileHeader
		pageLinks={firstTwoLinks}
		participants={$participants}
		practices={$practices}
		on:logout={() => authorize(false)}
	/>

	<Content
		{pageDataObject}
		on:submitFooter={submitFooter}
		on:update={updateData}
		on:logout={() => authorize(false)}
	>
		<slot />
		<svelte:fragment slot="login">
			<Login
				bind:open
				on:success={() => authorize(true)}
				on:close={closeLoginModal}
			/>
		</svelte:fragment>
	</Content>

	<SecondaryPanel
		participants={$participants}
		participateLink={lastLink} />
</div>

<ConfirmExit />
<ConfirmDelete />
<CookieModal />

<FooterEditor
	bind:this={footerEditor}
	id="footer-dialog"
	pageData={pageDataObject}
	on:update={updatePageData}
/>

<style>
	.main-layout {
		container: main / inline-size;
		display: flex;
		height: calc(100svh - var(--initial-padding-top));
		justify-content: space-between;
		padding: var(--body-padding);
		max-width: var(--max-content-width);
		margin: 0 auto;
		column-gap: var(--sections-padding);
		min-height: 800px;
	}

	:global(.audio-player) {
		/* position: absolute; */
		background-color: transparent;
	}

	:global(.audio-player) + .main-layout {
		height: calc(100svh - var(--initial-padding-top) - var(--player-height));
	}

	@media (width <= 1018px) {
		.main-layout {
			height: auto;
			flex-direction: column;
			justify-content: start;
			align-items: stretch;
		}
	}

	@media (width <= 1018px) {
		:global(.main-layout .panel) {
			flex: 1 0 auto;
			width: 100%;
			padding: 0;
			max-width: unset;
			min-width: unset;
			overflow: auto;
		}
	}
</style>
