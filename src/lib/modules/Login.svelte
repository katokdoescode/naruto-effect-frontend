<script>
import { enhance } from '$app/forms';
import { authorized } from '$lib/stores/authStore';
import Button from '$lib/ui/Button.svelte';
import Password from '$lib/ui/Password.svelte';
import { createEventDispatcher } from 'svelte';
import { _ } from 'svelte-i18n';

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
	dispatch('close');
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

<dialog
	class="login-dialog"
	{open}>
	<div class="wrapper">
		<form
			class="login-form"
			action="/api/signIn"
			method="post"
			use:enhance={signIn}
		>
			<h2>{$_('hokagemode')}</h2>

			<Password
				id="password"
				autocomplete="password">
				<svelte:fragment slot="error">
					{#if !!errorMessage}
						<span>{errorMessage}</span>
					{/if}
					{#if $authorized}
						<span>Already authorized</span>
					{/if}
				</svelte:fragment>
			</Password>

			<div class="buttons">
				<form
					id="close-login-dialog"
					class="close-dialog"
					method="dialog"
					on:submit={closeModal}
				>
					<Button
						color="white"
						form="close-login-dialog"
						styleType="login"
						type="submit">{$_('close')}</Button
					>
				</form>

				<Button
					styleType="login"
					type="submit">
					{isLoading ? `${$_('signingIn')}...` : $_('signIn')}
				</Button>
			</div>
		</form>
	</div>
</dialog>

<style scoped>
	.login-dialog[open] {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 1;
		background-color: var(--color-bg-main);
		border: none;
		display: flex;
		align-items: center;
	}

	@media (width <= 1018px) {
		.login-dialog[open] {
			width: 95%;
			box-shadow:
				-150px 0px 0px 30px var(--color-bg-main),
				150px 0px 0px 30px var(--color-bg-main);
		}
	}

	.login-dialog .wrapper {
		transform: translateY(-50%);
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.login-dialog .wrapper h2 {
		font-size: var(--font-heading-size);
	}

	.buttons {
		display: flex;
		justify-content: space-between;
	}

	.login-form {
		display: flex;
		flex-direction: column;
		gap: 34px;
	}

	.login-form :global(button) {
		margin-left: auto;
	}
</style>
