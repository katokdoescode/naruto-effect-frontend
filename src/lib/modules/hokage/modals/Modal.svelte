<script>
	export let open = false;
	export let message = '';

	let element;

	$: if (element) {
		if (open) element.showModal();
		else element.close();
	}
</script>

<dialog
	bind:this={element}
	class="modal">
	<div class="wrapper">
		<p class="message">{message}</p>

		<div class="buttons">
			<slot name="buttons" />
		</div>
	</div>
</dialog>

<style scoped>
	.modal[open] {
		animation: fade-in 0.2s ease-out;
	}

	.modal {
		padding: 20px;
		box-sizing: border-box;
		border: 2px solid var(--color-white);
		background-color: var(--color-black);
		color: var(--color-white);
		max-width: 250px;
		border-radius: 15px;
		animation: fade-out 0.2s ease-in;
	}

	@keyframes fade-in {
		0% {
			opacity: 0;
			transform: translateY(-1em);
			display: none;
		}

		100% {
			opacity: 1;
			transform: translateY(0);
			display: block;
		}
	}

	@keyframes fade-out {
		0% {
			opacity: 1;
			transform: translateY(0);
			display: block;
		}

		100% {
			opacity: 0;
			transform: translateY(-1em);
			display: none;
		}
	}

	.modal::backdrop {
		backdrop-filter: none;
		transition: display 0.2s ease-in allow-discrete;
	}

	.modal[open]::backdrop {
		backdrop-filter: blur(5px);
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 27px;
		justify-content: center;
		align-items: center;
	}

	.message {
		font-size: var(--font-second-menu-heading-size);
		font-weight: var(--font-menu-weight);
		text-align: center;
	}

	.buttons {
		display: flex;
		flex-direction: column;
		gap: 24px;
		width: 100%;
	}

	.buttons :global(button) {
		width: 100%;
	}
</style>
