<script>
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import Button from '$lib/ui/Button.svelte';
import { pick } from '$lib/utils/objectsTools';
import { createEventDispatcher, getContext, onDestroy } from 'svelte';
import { _, locale } from 'svelte-i18n';

const dispatch = createEventDispatcher();

let route;
$: route = $page.route.id;
$: isMainPage = route === '/' || '';
$: isCVPage = route === '/cv';
$: isCreatingMode = $page.url.pathname.includes('/create');
$: canDelete = !(isMainPage || isCVPage) && $isEditingState && !isCreatingMode;

const isEditingState = getContext('isEditingState');
const editingPageStatus = getContext('editingPageStatus');
const cvPage = getContext('cvPage');
const contentPage = getContext('contentPage');
const projectData = getContext('projectData');
const practiceData = getContext('practiceData');
const participantData = getContext('participantData');
const needSave = getContext('needSave');
const isShowDeleteModal = getContext('isShowDeleteModal');
const deleteModalDecision = getContext('deleteModalDecision');

const unsubscribeNeedSave = needSave.subscribe(
	(/** @type {boolean} */ save) => {
		if (save) saveContent();
	},
);

async function deleteContent() {
	editingPageStatus.set('loading');

	const response = await fetch(url().route, {
		method: 'DELETE',
		body: url().data,
	}).then((data) => data.json());

	if (response.success) {
		isEditingState.set(false);
		editingPageStatus.set('success');
		setTimeout(() => {
			editingPageStatus.set(null);
			window.location.assign('/');
		}, 2500);
	} else {
		editingPageStatus.set('error');
		setTimeout(() => editingPageStatus.set(null), 2500);
	}
}

async function saveContent() {
	editingPageStatus.set('loading');

	const response = await fetch(url().route, {
		method: url().method,
		body: url().data,
	}).then((data) => data.json());

	if (response.success) {
		isEditingState.set(false);
		editingPageStatus.set('success');
		url().onSuccess(response.data);
		setTimeout(() => {
			editingPageStatus.set(null);
		}, 2500);
	} else {
		editingPageStatus.set('error');
		setTimeout(() => editingPageStatus.set(null), 3500);
	}
}

function toggleEditMode() {
	if ($isEditingState) {
		saveContent();
		return;
	}

	isEditingState.set(true);
}

$: url = () => {
	switch (route) {
		case '/':
			return {
				route: '/api/mainPage',
				method: 'PATCH',
				rawData: $contentPage,
				data: JSON.stringify($contentPage),
				onSuccess: (/** @type {MainPageData} */ data) => data,
			};
		case '/cv':
			return {
				route: '/api/cv',
				method: 'PATCH',
				rawData: $cvPage,
				data: JSON.stringify($cvPage),
				onSuccess: (/** @type {CvData} */ data) => data,
			};

		case '/practices/create':
			return {
				route: '/api/practices',
				method: 'POST',
				rawData: $practiceData,
				data: JSON.stringify($practiceData),
				onSuccess: (/** @type {Practice} */ data) => {
					const slug = data.slug[$locale];
					goto(`/practices/${slug}`);
				},
			};

		case '/practices/[slug]':
			return {
				route: '/api/practices',
				method: 'PATCH',
				rawData: $practiceData,
				data: JSON.stringify($practiceData),
				onSuccess: (/** @type {Practice} */ practice) => {
					dispatch('update', {
						method: 'updatePractices',
						data: pick(practice, ['id', 'isVisible', 'slug', 'title']),
					});
					goto(`/practices/${practice.slug[$locale]}`);
				},
			};

		case '/participants/create':
			return {
				route: '/api/participants',
				method: 'POST',
				rawData: $participantData,
				data: JSON.stringify($participantData),
				onSuccess: (/** @type {Participant} */ data) => {
					const slug = data.slug;
					goto(`/participants/${slug}`);
				},
			};

		case '/participants/[slug]':
			return {
				route: '/api/participants',
				method: 'PATCH',
				rawData: $participantData,
				data: JSON.stringify($participantData),
				onSuccess: (/** @type {Participant} */ participant) => {
					dispatch('update', {
						method: 'updateParticipants',
						data: pick(participant, ['id', 'isVisible', 'slug', 'name']),
					});
					goto(`/participants/${participant.slug}`);
				},
			};

		case '/(projects)/projects/create':
			return {
				route: '/api/projects',
				method: 'POST',
				rawData: $projectData,
				data: JSON.stringify($projectData),
				onSuccess: (/** @type {Project} */ data) => {
					const slug = data.slug;
					goto(`/projects/${slug}`);
				},
			};

		case '/(projects)/projects/[slug]':
			return {
				route: '/api/projects',
				method: 'PATCH',
				rawData: $projectData,
				data: JSON.stringify($projectData),
				onSuccess: (/** @type {Project} */ project) => {
					dispatch('update', {
						method: 'updateProjects',
						data: pick(project, ['id', 'isVisible', 'slug', 'name']),
					});
					goto(`/projects/${project.slug}`);
				},
			};

		default:
			break;
	}
};

async function deleteEntity() {
	let unsubscribe = () => null;
	isShowDeleteModal.set(true);

	await (() =>
		new Promise(() => {
			unsubscribe = deleteModalDecision.subscribe(async (d) => {
				const decision = await d;

				console.debug(decision);

				if (decision === undefined) return;

				if (decision) deleteContent();
			});
		}))();

	unsubscribe();
}

$: isImageValid = url()?.rawData?.banner
	? !!(url()?.rawData.banner.link ? url()?.rawData?.banner.alt : true)
	: true;
$: isTitleEmpty = !!(url()?.rawData?.title && !url().rawData.title[$locale]);
$: isNameEmpty = !!(url()?.rawData?.name && !url().rawData.name[$locale]);
$: isDescriptionEmpty =
	url()?.rawData?.description &&
	!Object.values(url().rawData?.description).some((v) => v) &&
	url()?.rawData?.text &&
	!Object.values(url()?.rawData?.text).some((v) => v);
$: isNotValid =
	$isEditingState &&
	(isDescriptionEmpty || isTitleEmpty || isNameEmpty || !isImageValid);

$: btnStatus = () => {
	if ($editingPageStatus) {
		return $editingPageStatus;
	}
	return $isEditingState ? 'save' : 'edit';
};

$: btnColor = () => {
	if (btnStatus()) {
		switch (btnStatus()) {
			case 'success':
				return 'green';
			case 'error':
				return 'red';
			default:
				return 'gray';
		}
	}

	return 'gray';
};

onDestroy(() => unsubscribeNeedSave());
</script>

<div class="row" aria-controls="content" role="toolbar">
	<Button
		color={btnColor()}
		disabled={isNotValid}
		value={btnStatus()}
		on:click={toggleEditMode}>
		{$_(`button.${btnStatus()}`)}
	</Button>

	{#if canDelete}
		<Button
			color="red"
			nativeClasses="no-mobile"
			value='delete'
			on:click={deleteEntity}>
			{$_(`button.delete`)}
		</Button>
	{/if}
</div>

<style scoped>
	.row {
		display: flex;
		justify-content: space-between;
	}
</style>
