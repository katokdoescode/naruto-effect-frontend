<script>
import { beforeNavigate, goto, replaceState } from '$app/navigation';
import { page } from '$app/stores';
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
import { handleKeydown, handleKeyup } from '$lib/utils/keyboardHandler';
import { onMount, setContext } from 'svelte';
import { locale } from 'svelte-i18n';
import { writable } from 'svelte/store';

/** @type {MainLayoutData} */
export let data;

/** @type {string}*/
let whereToGo;

let open = false;

const needSave = writable(false);
const combo = writable();
const authorized = writable();
const isEditingState = writable();
const editingPageStatus = writable();
const cvPage = writable();
const contentPage = writable();
const practiceData = writable();
const participantData = writable();
const appColorScheme = writable();
const isShowConfirmExitModal = writable();
const confirmModalDecision = writable();
const isShowDeleteModal = writable();
const deleteModalDecision = writable();
const isFooterEditorOpen = writable(false);
const footerEditorState = writable('save');

let footerEditor;
let practices = data?.practices || [];
let participants = data?.participants || [];
let pageLinks = data?.pageData?.pageLinks || [];
let loginPhrase = data?.loginPhrase || undefined;
let pageDataObject = data?.pageData || null;

$: firstTwoLinks = pageLinks?.slice(0, 2);
$: lastLink = pageLinks?.slice(2, 3)[0];

$: canNavigate = false;

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
				practices = data.data;
			}
		});

	await fetch('/api/participants')
		.then((res) => res.json())
		.then((data) => {
			if (!data.success) {
				// eslint-disable-next-line no-console
				console.error(data.errorMessage);
			} else {
				participants = data.data;
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
			practices = practices.map((practice) =>
				practice.id === data.id ? data : practice,
			);
		},
		/** @param {Participant} data */
		updateParticipants: (data) => {
			participants = participants.map((participant) =>
				participant.id === data.id ? data : participant,
			);
		},
	};

	methods[method](data);
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

onMount(() => {
	const settedLocale = localStorage.getItem('userLang');
	if (settedLocale) locale.set(settedLocale);

	locale.subscribe((lang) => {
		document.querySelector('html').lang = lang;
		localStorage.setItem('userLang', lang);
		document.cookie = `lang=${lang}; path=/`;
	});

	initHandlers();
	logoController();
});

setContext('needSave', needSave);
setContext('authorized', authorized);
setContext('combo', combo);
setContext('isEditingState', isEditingState);
setContext('editingPageStatus', editingPageStatus);
setContext('cvPage', cvPage);
setContext('contentPage', contentPage);
setContext('practiceData', practiceData);
setContext('participantData', participantData);
setContext('appColorScheme', appColorScheme);
setContext('isShowConfirmExitModal', isShowConfirmExitModal);
setContext('confirmModalDecision', confirmModalDecision);
setContext('isShowDeleteModal', isShowDeleteModal);
setContext('deleteModalDecision', deleteModalDecision);
setContext('isFooterEditorOpen', isFooterEditorOpen);
setContext('footerEditorState', footerEditorState);

$: if ($combo) {
	open = true;
}
$: open = false;
$: authorized.set(data?.authorized || false);
$: readAnchorTag();

confirmModalDecision.subscribe(async (d) => {
	const decision = await d;
	if (decision === undefined) return;
	if (whereToGo) {
		if (decision) {
			needSave.set(true);
			canNavigate = true;
			goto(whereToGo);
		} else {
			needSave.set(false);
			canNavigate = true;
			goto(whereToGo);
		}
	}
});

beforeNavigate(async (event) => {
	if (!canNavigate && $isEditingState) {
		event.cancel();
		whereToGo = event.to.url?.href;
		isShowConfirmExitModal.set(true);
	} else {
		canNavigate = false;
		isEditingState.set(false);
	}
});
</script>

<svelte:head>
	{#if $authorized}
		<script src="/scripts/tinymce/tinymce.min.js"></script>
	{/if}
</svelte:head>

<FavIcons />

<div class="screen main-layout">
	<MainPanel
		pageLinks={firstTwoLinks}
		{practices} />

	<MobileHeader
		pageLinks={firstTwoLinks}
		{participants}
		{practices}
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
		{participants}
		participateLink={lastLink} />
</div>

<ConfirmExit />
<ConfirmDelete />
<CookieModal />

<FooterEditor
	bind:this={footerEditor}
	id="footer-dialog"
	pageData={pageDataObject}
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
