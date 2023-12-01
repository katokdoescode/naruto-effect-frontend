<script>
	import Button from '$lib/ui/Button.svelte';
	import { getContext } from 'svelte';
	import { _ } from 'svelte-i18n';
	import Modal from './Modal.svelte';

	const isShowConfirmExitModal = getContext('isShowConfirmExitModal');

	let open = false;
	let message = '';

	$: message = $_('messages.confirm.exit');
	$: open = $isShowConfirmExitModal;

	function closeModal() {
		isShowConfirmExitModal.set(false);
	}
</script>

<Modal
	{message}
	{open}>
	<svelte:fragment slot="buttons">
		<Button
			color="gray"
			on:click={closeModal}>{$_('button.dont')}</Button>
		<Button color="gray">{$_('button.save')}</Button>
	</svelte:fragment>
</Modal>
