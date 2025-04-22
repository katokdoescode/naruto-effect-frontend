<script>
import { page } from '$app/stores';
import { isEditingState, needCancel, needDelete } from '$lib/stores/appStore';
import { entityVisibility } from '$lib/stores/entityVisibilityStore';
import Button from '$lib/ui/Button.svelte';
import { onMount } from 'svelte';
import { _ } from 'svelte-i18n';
import ToggleEditMode from './ToggleEditMode.svelte';

let checked = false;

$: route = $page.route.id || '';
$: isMainPage = route === '/' || '';
$: isCvPage = route?.includes('cv') || '';
$: isCreating = route?.includes('create') || '';
$: entityVisibility.set(checked);

function cancelEditing() {
	needCancel.set(true);
}

function deleteEntity() {
	needDelete.set(true);
}

onMount(() => {
	const unsubscribe = entityVisibility.subscribe((visibility) => {
		checked = visibility;
	});

	return () => {
		unsubscribe();
	};
});
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
				/>
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
