<script>
import { page } from '$app/stores';
import {
	editingPageStatus,
	isEditingState,
	needDelete,
	needSave,
} from '$lib/stores/appStore';
import Button from '$lib/ui/Button.svelte';
import { _ } from 'svelte-i18n';

let route;
$: route = $page.route.id;
$: isMainPage = route === '/' || '';
$: isCVPage = route === '/cv';
$: isProjectsPage = route === '/(projects)/projects';
$: isCreatingMode = $page.url.pathname.includes('/create');
$: canDelete =
	!(isMainPage || isCVPage || isProjectsPage) &&
	$isEditingState &&
	!isCreatingMode;

$: btnStatus = (() => {
	if ($editingPageStatus) {
		return $editingPageStatus;
	}
	return $isEditingState ? 'save' : 'edit';
})();

/** @type {'green' | 'red' | 'gray'} */
$: btnColor = (() => {
	if (btnStatus) {
		switch (btnStatus) {
			case 'success':
				return 'green';
			case 'error':
				return 'red';
			default:
				return 'gray';
		}
	}

	return 'gray';
})();
</script>

<div class="row" aria-controls="content" role="toolbar">
	{#if !$isEditingState}
		{#if !isProjectsPage}
			<Button
				color={btnColor}
				value={btnStatus}
				on:click={() => isEditingState.set(!$isEditingState)}>
				{$_(`button.${btnStatus}`)}
			</Button>
		{/if}
	{:else}
		<Button
			color={btnColor}
			value={btnStatus}
			on:click={() => needSave.set(true)}>
			{$_(`button.${btnStatus}`)}
		</Button>
	{/if}

	{#if canDelete}
		<Button
			color="red"
			nativeClasses="no-mobile"
			value='delete'
			on:click={() => needDelete.set(true)}>
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
