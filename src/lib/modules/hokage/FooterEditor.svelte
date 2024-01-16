<script>
	import { enhance } from '$app/forms';
	import Button from '$lib/ui/Button.svelte';
	import Input from '$lib/ui/Input.svelte';
	import Textarea from '$lib/ui/Textarea.svelte';
	import { _ } from 'svelte-i18n';

	let state = 'save';

	/** @type {"transparent"|"gray"|"black"|"green"|"red"|"white"} Color of the button */
	$: color = state === 'success' ? 'green' : state === 'error' ? 'red' : 'gray';

	function submitForm() {
		state = 'loading';

		return async ({ result }) => {
			const { success } = result;

			state = success ? 'success' : 'error';

			setTimeout(() => {
				state = 'save';
			}, 3500);
		};
	}
</script>

<div class="footer-editor">
	<form
		class="form-common"
		action="/api/common"
		method="POST"
		use:enhance={submitForm}
	>
		<div class="wrapper">
			<fieldset class="inputgroup">
				<Input
					id="first-link-title"
					placeholder="Заголовок ссылки 1"
					round
					type="text"
				/>

				<Input
					id="first-link-value"
					placeholder="Ссылка 1"
					round
					type="text" />
			</fieldset>

			<fieldset class="inputgroup">
				<Input
					id="second-link-title"
					placeholder="Заголовок ссылки 2"
					round
					type="text"
				/>

				<Input
					id="second-link-value"
					placeholder="Ссылка 2"
					round
					type="text"
				/>
			</fieldset>

			<fieldset class="inputgroup wide">
				<Input
					id="year"
					inputmode="numeric"
					placeholder="Год"
					round
					type="text"
				/>

				<Textarea
					id="copyright"
					placeholder="Текст копирайта"
					round />
			</fieldset>

			<fieldset class="inputgroup">
				<Input
					id="participate-link-title"
					placeholder="Текст кнопки"
					round
					type="text"
				/>

				<Input
					id="participate-link-value"
					placeholder="Ссылка"
					round
					type="text"
				/>
			</fieldset>
		</div>

		<div class="button-container no-desktop">
			<Button
				{color}
				type="submit">
				{$_(`button.${state}`)}
			</Button>
		</div>
	</form>
</div>

<style scoped>
	.footer-editor {
		position: fixed;
		bottom: 10%;
		left: -2%;
		width: 100vw;
		padding: 0 15px;
		box-sizing: border-box;
	}

	@media (width <= 1018px) {
		.footer-editor {
			left: 50%;
			bottom: 50%;
			transform: translate(-50%, 50%);
			height: 100vh;
			padding: 50px 15px 33px;
		}
	}

	.form-common {
		background-color: var(--color-main);
		border-radius: 15px;
		margin: 0 auto;
		padding: 20px;
		margin: 0 auto;
		width: 100%;
		box-sizing: border-box;
		max-width: 1250px;
		box-shadow: 0px 4px 4px 0px
			color-mix(in srgb, var(--color-main) 50%, var(--color-bg-main) 50%);
	}

	@media (width <= 1018px) {
		.form-common {
			height: 100%;
		}
	}

	.form-common .wrapper {
		display: flex;
		flex-wrap: wrap;
		gap: 27px;
		align-items: center;
	}

	.form-common .button-container {
		display: flex;
		margin-top: 27px;
		width: 100%;
		justify-content: center;
	}

	.form-common .inputgroup {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin: 0;
		padding: 0;
		border: none;
	}

	@media (width <= 1018px) {
		.form-common .inputgroup {
			flex: 1 1 100%;
		}
	}

	.form-common .inputgroup.wide {
		flex-grow: 1;
	}

	:global(.inputgroup input:first-child) {
		font-weight: 700;
	}
</style>
