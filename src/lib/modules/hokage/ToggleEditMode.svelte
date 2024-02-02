<script>
	import { page } from '$app/stores';
	import Button from '$lib/ui/Button.svelte';
	import { pick } from '$lib/utils/objectsTools';
	import { createEventDispatcher, getContext } from 'svelte';
	import { _, locale } from 'svelte-i18n';

	const dispatch = createEventDispatcher();

	let route;
	$: route = $page.route.id;
	$: isMainPage = route === '/' || '';
	$: isCVPage = route === '/cv';
	$: isCreatingMode = $page.url.pathname.includes('/create');
	$: canDelete =
		!(isMainPage || isCVPage) && $isEditingState && !isCreatingMode;

	const isEditingState = getContext('isEditingState');
	const editingPageStatus = getContext('editingPageStatus');
	const contentPage = getContext('contentPage');
	const practiceData = getContext('practiceData');
	const participantData = getContext('participantData');
	const needSave = getContext('needSave');
	const isShowDeleteModal = getContext('isShowDeleteModal');
	const deleteModalDecision = getContext('deleteModalDecision');

	needSave.subscribe((save) => {
		if (save) saveContent();
	});

	async function deleteContent() {
		editingPageStatus.set('loading');

		const response = await fetch(url().route, {
			method: 'DELETE',
			body: url().data
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
			setTimeout(() => editingPageStatus.set(null), 3500);
		}
	}

	async function saveContent() {
		editingPageStatus.set('loading');

		const response = await fetch(url().route, {
			method: url().method,
			body: url().data
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

	$: url = function () {
		switch (route) {
			case '/':
				return {
					route: '/api/mainPage',
					method: 'PATCH',
					data: JSON.stringify($contentPage),
					onSuccess: function (data) {
						return data;
					}
				};

			case '/practices/create':
				return {
					route: '/api/practices',
					method: 'POST',
					data: JSON.stringify($practiceData),
					onSuccess: function (data) {
						const slug = data.slug[$locale];
						window.location.assign(`/practices/${slug}`);
					}
				};

			case '/practices/[slug]':
				return {
					route: '/api/practices',
					method: 'PATCH',
					data: JSON.stringify($practiceData),
					onSuccess: function (practice) {
						dispatch('update', {
							method: 'updatePractices',
							data: pick(practice, ['id', 'isVisible', 'slug', 'title'])
						});
					}
				};

			case '/participants/create':
				return {
					route: '/api/participants',
					method: 'POST',
					data: JSON.stringify($participantData),
					onSuccess: function (data) {
						const slug = data.slug;
						window.location.assign(`/participants/${slug}`);
					}
				};

			case '/participants/[slug]':
				return {
					route: '/api/participants',
					method: 'PATCH',
					data: JSON.stringify($participantData),
					onSuccess: function (participant) {
						dispatch('update', {
							method: 'updateParticipants',
							data: pick(participant, ['id', 'isVisible', 'slug', 'name'])
						});
					}
				};

			default:
				break;
		}
	};

	function deleteEntity() {
		isShowDeleteModal.set(true);
		deleteModalDecision.subscribe(async (d) => {
			const decision = await d;
			if (decision === undefined) return;

			if (decision) deleteContent();
		});
	}

	$: btnStatus = function () {
		if ($editingPageStatus) {
			return $editingPageStatus;
		} else {
			return $isEditingState ? 'save' : 'edit';
		}
	};

	$: btnColor = function () {
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
</script>

<div class="row">
	<Button
		color={btnColor()}
		on:click={toggleEditMode}>
		{$_(`button.${btnStatus()}`)}
	</Button>

	{#if canDelete}
		<Button
			color="red"
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
