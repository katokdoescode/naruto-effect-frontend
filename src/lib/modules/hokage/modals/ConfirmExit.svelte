<script>
import { page } from '$app/stores';
import {
	confirmExitModalDecision,
	isShowConfirmExitModal,
} from '$lib/stores/modalsStore';
import Button from '$lib/ui/Button.svelte';
import { _ } from 'svelte-i18n';
import Modal from './Modal.svelte';

let open = false;
let message = '';

$: isCreatingMode = $page.url.pathname.includes('/create');
$: message = isCreatingMode
	? $_('messages.confirm.exitCreating')
	: $_('messages.confirm.exit');
$: open = $isShowConfirmExitModal;

$: if (!open)
	confirmExitModalDecision.set(new Promise((resolve) => resolve(undefined)));

async function cancel() {
	confirmExitModalDecision.set(new Promise((resolve) => resolve(false)));

	isShowConfirmExitModal.set(false);
}

function confirm() {
	confirmExitModalDecision.set(new Promise((resolve) => resolve(true)));

	isShowConfirmExitModal.set(false);
}
</script>

<Modal
	{message}
	{open}>
	<svelte:fragment slot="buttons">
		{#if isCreatingMode}
			<Button
				color="gray"
				on:click={cancel}>
				{$_('button.dont')}
			</Button>
			<Button
				color="gray"
				on:click={confirm}>
				{$_('button.yes')}
			</Button>
		{:else}
			<Button
				color="gray"
				on:click={cancel}>
				{$_('button.dont')}
			</Button>
			<Button
				color="gray"
				on:click={confirm}>
				{$_('button.save')}
			</Button>
		{/if}
	</svelte:fragment>
</Modal>
