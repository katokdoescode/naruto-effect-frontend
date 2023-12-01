<script>
	import { page } from '$app/stores';
	import Button from '$lib/ui/Button.svelte';
	import { getContext } from 'svelte';
	import { _ } from 'svelte-i18n';
	import ToggleEditMode from './ToggleEditMode.svelte';

	let route = '';
	let isMainPage = false;
	let isPracticePage = false;
	let isParticipantPage = false;
	let isCvPage = false;

	$: route = $page.route.id;
	$: isMainPage = route === '/';
	$: isPracticePage = route.includes('practices');
	$: isParticipantPage = route.includes('participants');
	$: isCvPage = route.includes('cv');
	$: isCreating = route.includes('create');

	const isEditingState = getContext('isEditingState');
	const editingPageStatus = getContext('editingPageStatus');

	async function deletePractice(id) {
		await fetch('/api/practices', {
			method: 'DELETE',
			body: JSON.stringify({ id })
		})
			.then((res) => res.json())
			.then((data) => {
				if (!data.success) {
					// eslint-disable-next-line no-console
					console.debug(data.errorMessage);
				} else {
					cancelEditing();
					window.location.replace('/');
				}
			});
	}

	async function deleteParticipant(id) {
		await fetch('/api/participants', {
			method: 'DELETE',
			body: JSON.stringify({ id })
		})
			.then((res) => res.json())
			.then((data) => {
				if (!data.success) {
					// eslint-disable-next-line no-console
					console.debug(data.errorMessage);
				} else {
					cancelEditing();
					window.location.replace('/');
				}
			});
	}

	function cancelEditing() {
		isEditingState.set(false);
		editingPageStatus.set(null);
		if (isCreating) window.location.replace('/');
	}

	function deleteEntity() {
		if (
			isPracticePage &&
				window.confirm($_('messages.confirm.practice.delete'))
		) {
			deletePractice($page.data.practice.id);
		}

		if (
			isParticipantPage &&
				window.confirm($_('messages.confirm.participant.delete'))
		) {
			deleteParticipant($page.data.participant.id);
		}
	}
</script>

<div class="mobile-edit-panel">
	<ToggleEditMode />

	{#if $isEditingState}
		<div class="button-wrapper">
			<Button
				color="white"
				on:click={cancelEditing}>Отмена</Button>
		</div>

		<label>
			{#if !isMainPage && !isCvPage}
				<input type="checkbox" />
				<span>Сделать видимым</span>
			{/if}
		</label>

		<div class="button-wrapper">
			{#if !isMainPage && !isCvPage && !isCreating}
				<Button
					color="red"
					on:click={deleteEntity}>Удалить</Button>
			{/if}
		</div>
	{/if}
</div>

<style scoped>
	.mobile-edit-panel {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, max-content);
		align-items: flex-end;
		gap: 20px;
		width: 100%;
	}

	.button-wrapper {
		display: flex;
		justify-content: flex-end;
	}
</style>
