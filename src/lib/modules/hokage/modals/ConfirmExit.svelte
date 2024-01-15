<script>
	import Button from '$lib/ui/Button.svelte';
	import { getContext } from 'svelte';
	import { _ } from 'svelte-i18n';
	import Modal from './Modal.svelte';

	const isShowConfirmExitModal = getContext('isShowConfirmExitModal');
	const confirmModalDecision = getContext('confirmModalDecision');

	let open = false;
	let message = '';

	$: message = $_('messages.confirm.exit');
	$: open = $isShowConfirmExitModal;

	async function cancel() {
		confirmModalDecision.set(new Promise((resolve) => resolve(false)));

		isShowConfirmExitModal.set(false);
	}

	function confirm() {
		confirmModalDecision.set(new Promise((resolve) => resolve(true)));

		isShowConfirmExitModal.set(false);
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
			color="gray"
			on:click={confirm}>
			{$_('button.save')}
		</Button>
	</svelte:fragment>
</Modal>
