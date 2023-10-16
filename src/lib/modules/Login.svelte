<script>
	import Input from '$lib/ui/Input.svelte';
	import Button from '$lib/ui/Button.svelte';

	import { auth } from '@/api/auth';
	import { _ } from 'svelte-i18n';

	/**
	 * @type {boolean}
	 */
	export let open = false;
	function closeModal() {
		clearData();
		open = false;
	}

	function clearData() {
		for (const key in formData) {
			formData[key] = '';
		}

		errorMessage = undefined;
		isLoading = false;
	}

	function validate() {
		return Object.values(formData).every((field) => field);
	}

	async function signIn() {
		if (!validate()) {
			errorMessage = 'Fill the fields';
			return;
		}

		isLoading = true;
		try {
			const { authToken } = await auth(formData, window.fetch);
			if (authToken) {
				document.cookie = `authToken=${authToken}; path=/;`;
				closeModal();
				isLoading = false;
			}
		} catch (error) {
			errorMessage = error.message;
			isLoading = false;
		}
	}

	let formData = {
		email: '',
		password: ''
	};

	let isLoading = false;
	let errorMessage;
</script>

<dialog {open}>
	<form action="/" method="post" on:submit|preventDefault={signIn}>
		<Input type="email" name="email" bind:value={formData.email} />
		<Input type="password" name="password" bind:value={formData.password} />
		<Button type="submit">{isLoading ? `${$_('signingIn')}...` : $_('signIn')}</Button>
		{#if !!errorMessage}
			<span>{errorMessage}</span>
		{/if}
	</form>
	<form method="dialog">
		<button type="button" on:click={closeModal}>{$_('close')}</button>
	</form>
</dialog>
