<script>
	import { enhance } from '$app/forms';
	import Input from '$lib/ui/Input.svelte';
	import Button from '$lib/ui/Button.svelte';
	import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	/**
	 * @type {boolean}
	 */
	export let open = false;

	let isLoading = false;
	let errorMessage;

	function closeModal() {
		errorMessage = undefined;
		isLoading = false;
		open = false;
	}

	async function signIn() {
		isLoading = true;

		return async ({ result }) => {
			if (result.success) {
				isLoading = false;
				dispatch('success');
				closeModal();
			} else {
				errorMessage = result.errorMessage;
				isLoading = false;
			}
		};
	}
</script>

<dialog {open}>
	<form
		action="/api/signIn"
		method="post"
		use:enhance={signIn}>
		<Input
			name="email"
			autocomplete="email"
			type="email" />
		<Input
			name="password"
			autocomplete="password"
			type="password" />
		<Button type="submit"
		>{isLoading ? `${$_('signingIn')}...` : $_('signIn')}</Button
		>
		{#if !!errorMessage}
			<span>{errorMessage}</span>
		{/if}
	</form>
	<form
		method="dialog"
		on:submit={closeModal}>
		<button type="submit">{$_('close')}</button>
	</form>
</dialog>
