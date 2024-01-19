<script>
	import { enhance } from '$app/forms';
	import Button from '$lib/ui/Button.svelte';
	import Input from '$lib/ui/Input.svelte';
	import Textarea from '$lib/ui/Textarea.svelte';
	import { getContext } from 'svelte';
	import { _ } from 'svelte-i18n';
	const isFooterEditorOpen = getContext('isFooterEditorOpen');
	const footerEditorState = getContext('footerEditorState');

	export let open = true;
	export let nativeClasses = '';
	export let id;
	let submitBtn;

	footerEditorState.set('save');

	/** @type {"transparent"|"gray"|"black"|"green"|"red"|"white"} Color of the button */
	$: color =
		$footerEditorState === 'success'
			? 'green'
			: $footerEditorState === 'error'
			? 'red'
			: 'gray';

	export function submit() {
		submitBtn.nativeClick();
	}

	function submitForm() {
		footerEditorState.set('loading');

		return async ({ result }) => {
			const { success } = result;

			footerEditorState.set(success ? 'success' : 'error');

			setTimeout(() => {
				footerEditorState.set('save');
				isFooterEditorOpen.set(false);
			}, 3500);
		};
	}
</script>

<dialog
	class={'footer-editor ' + nativeClasses}
	{open}>
	<form
		{id}
		method="dialog"
		on:submit={() => isFooterEditorOpen.set(false)} />
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

		<div class="button-container">
			<Button
				bind:this={submitBtn}
				{color}
				type="submit">
				{$_(`button.${$footerEditorState}`)}
			</Button>

			<Button
				color="red"
				form={id}
				type="submit">
				{$_('button.cancel')}
			</Button>
		</div>
	</form>
</dialog>

<style scoped>
	.footer-editor {
		position: fixed;
		bottom: 10%;
		width: 100%;
		padding: 0 15px;
		box-sizing: border-box;
		border: none;
		margin: 0;
		left: 0;
		z-index: 1;
	}

	@media (width <= 1018px) {
		.footer-editor {
			height: 100vh;
			width: 100%;
			bottom: unset;
			top: 0;
			padding: 50px 15px 33px;
			margin: 0;
			background-color: rgba(0, 0, 0, 0.3);
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
		max-width: 1315px;
		box-shadow: 0px 4px 4px 0px
			color-mix(in srgb, var(--color-main) 50%, var(--color-bg-main) 50%);
		overflow: auto;
	}

	@media (width <= 1018px) {
		.form-common {
			display: flex;
			flex-direction: column;
			justify-content: center;
			height: 100%;
		}

		@media (height <= 500px) {
			.form-common {
				justify-content: flex-start;
			}
		}
	}

	.form-common .wrapper {
		display: flex;
		flex-wrap: wrap;
		gap: 27px;
		align-items: center;
	}

	@media (width >= 1018px) {
		.form-common .wrapper {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));
		}
	}

	.form-common .button-container {
		display: flex;
		margin-top: 27px;
		width: 100%;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1em;
	}

	@media (width >= 1018px) {
		.form-common .button-container {
			position: absolute;
			opacity: 0;
			width: 0;
			height: 0;
		}
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

	:global(.inputgroup input:first-child) {
		font-weight: 700;
	}
</style>
