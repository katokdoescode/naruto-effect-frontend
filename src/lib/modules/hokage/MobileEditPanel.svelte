<script>
import { page } from '$app/stores';
import Button from '$lib/ui/Button.svelte';
import { getContext } from 'svelte';
import { _ } from 'svelte-i18n';
import ToggleEditMode from './ToggleEditMode.svelte';

const participantData = getContext('participantData');
const practiceData = getContext('practiceData');
const isEditingState = getContext('isEditingState');
const editingPageStatus = getContext('editingPageStatus');

let checked = false;

$: route = $page.route.id || '';
$: isPracticePage = route?.includes('practices') || '';
$: isParticipantsPage = route?.includes('participants') || '';
$: isMainPage = route === '/' || '';
$: isCvPage = route?.includes('cv') || '';
$: isCreating = route?.includes('create') || '';

$: {
	if (isParticipantsPage) {
		checked = $participantData?.isVisible;
	}

	if (isPracticePage) {
		checked = $practiceData?.isVisible;
	}
}

async function deletePractice(id) {
	await fetch('/api/practices', {
		method: 'DELETE',
		body: JSON.stringify({ id }),
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
		body: JSON.stringify({ id }),
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
		isParticipantsPage &&
		window.confirm($_('messages.confirm.participant.delete'))
	) {
		deleteParticipant($page.data.participant.id);
	}
}

function check({ target }) {
	const { checked } = target;
	if (isPracticePage) {
		practiceData.set({
			...$practiceData,
			isVisible: checked,
		});
	}

	if (isParticipantsPage) {
		participantData.set({
			...$participantData,
			isVisible: checked,
		});
	}
}
</script>

<div class="mobile-edit-panel">
	<ToggleEditMode />

	{#if $isEditingState}
		<div class="button-wrapper">
			<Button
				color="white"
				on:click={cancelEditing}
			>{$_('button.cancel')}</Button
			>
		</div>

		<label>
			{#if !isMainPage && !isCvPage}
				<input
					type="checkbox"
					bind:checked
					on:input={check} />
				<span>{$_('mainMenu.settings.publicity')}</span>
			{/if}
		</label>

		<div class="button-wrapper">
			{#if !isMainPage && !isCvPage && !isCreating}
				<Button
					color="red"
					on:click={deleteEntity}
				>{$_('button.delete')}</Button
				>
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
