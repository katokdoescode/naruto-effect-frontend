<script>
import { page } from '$app/stores';
import {
	confirmLeaveModalDecision,
	isShowConfirmLeaveModal,
} from '$lib/stores/modalsStore';
import Button from '$lib/ui/Button.svelte';
import { _ } from 'svelte-i18n';
import Modal from './Modal.svelte';

let open = false;
let message = '';

$: isCreatingMode = $page.url.pathname.includes('/create');
$: message = isCreatingMode
	? $_('messages.leave.exitCreating')
	: $_('messages.leave.exit');
$: info = $_('messages.leave.info');
$: open = $isShowConfirmLeaveModal;

$: if (!open)
	confirmLeaveModalDecision.set(new Promise((resolve) => resolve(undefined)));

async function cancel() {
	confirmLeaveModalDecision.set(new Promise((resolve) => resolve(false)));

	isShowConfirmLeaveModal.set(false);
}

function confirm() {
	confirmLeaveModalDecision.set(new Promise((resolve) => resolve(true)));

	isShowConfirmLeaveModal.set(false);
}
</script>

<Modal
	{message}
	{open}
	{info}>
	<svelte:fragment slot="buttons">
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
	</svelte:fragment>
</Modal>
