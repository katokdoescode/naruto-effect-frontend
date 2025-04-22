<script>
import {
	deleteModalDecision,
	isShowDeleteModal,
} from '$lib/stores/modalsStore';
import Button from '$lib/ui/Button.svelte';
import { _ } from 'svelte-i18n';
import Modal from './Modal.svelte';

let open = false;
let message = '';

$: message = $_('messages.confirm.delete');
$: open = $isShowDeleteModal;

$: if (!open)
	deleteModalDecision.set(new Promise((resolve) => resolve(undefined)));

async function cancel() {
	deleteModalDecision.set(new Promise((resolve) => resolve(false)));

	isShowDeleteModal.set(false);
}

function confirm() {
	deleteModalDecision.set(new Promise((resolve) => resolve(true)));

	isShowDeleteModal.set(false);
}
</script>

<Modal
	{message}
	{open}>
	<svelte:fragment slot="buttons">
		<Button
			color="gray"
			on:click={cancel}>
			{$_('button.dont')}
		</Button>

		<Button
			color="red"
			on:click={confirm}>
			{$_('button.delete')}
		</Button>
	</svelte:fragment>
</Modal>
