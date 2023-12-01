<script>
	import Button from '$lib/ui/Button.svelte';
	import { getContext } from 'svelte';
	import { _ } from 'svelte-i18n';
	import Modal from './Modal.svelte';

	const isShowDeleteModal = getContext('isShowDeleteModal');

	let open = false;
	let message = '';

	$: message = $_('messages.confirm.delete');
	$: open = $isShowDeleteModal;

	function closeModal() {
		isShowDeleteModal.set(false);
	}
</script>

<Modal
	{message}
	{open}>
	<svelte:fragment slot="buttons">
		<Button
			color="gray"
			on:click={closeModal}>{$_('button.dont')}</Button>
		<Button color="red">{$_('button.delete')}</Button>
	</svelte:fragment>
</Modal>
