<script>
	import { page } from '$app/stores';
	import Button from '$lib/ui/Button.svelte';
	import { getContext } from 'svelte';
	import { _ } from 'svelte-i18n';
	import Modal from './Modal.svelte';

	const isShowConfirmExitModal = getContext('isShowConfirmExitModal');
	const confirmModalDecision = getContext('confirmModalDecision');

	let open = false;
	let message = '';

	$: isCreatingMode = $page.url.pathname.includes('/create');
	$: message = isCreatingMode
		? $_('messages.confirm.exitCreating')
		: $_('messages.confirm.exit');
	$: open = $isShowConfirmExitModal;

	$: if (!open)
		confirmModalDecision.set(new Promise((resolve) => resolve(undefined)));

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
		{#if isCreatingMode}
			<Button
				color="gray"
				on:click={confirm}>
				{$_('button.dont')}
			</Button>
			<Button
				color="gray"
				on:click={cancel}>
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
