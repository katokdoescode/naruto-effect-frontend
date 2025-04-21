<script>
import { footerEditorState, isFooterEditorOpen } from '$lib/stores/appStore';
import Button from '$lib/ui/Button.svelte';
import Input from '$lib/ui/Input.svelte';
import Textarea from '$lib/ui/Textarea.svelte';
import { createEventDispatcher } from 'svelte';
import { _, locale } from 'svelte-i18n';

const dispatch = createEventDispatcher();

export let nativeClasses = '';
export let id;
export let pageData;

let firstFocusElement;
let open = false;

$: isReady =
	!!pageData &&
	[pageData.id, pageData.pageLinks, pageData.year, pageData.copyright].every(
		(entry) => !!entry,
	);
$: open = $isFooterEditorOpen;
$: if (open && firstFocusElement) {
	firstFocusElement.focus();
}

let submitBtn;

footerEditorState.set('save');

/** @type {"transparent"|"gray"|"black"|"green"|"red"|"white"} Color of the button */
$: color =
	$footerEditorState === 'success'
		? 'green'
		: $footerEditorState === 'error'
			? 'red'
			: 'gray';

function blurLastElement() {
	firstFocusElement.focus();
}

export function submit() {
	submitBtn.nativeClick();
}

async function submitForm() {
	footerEditorState.set('loading');

	/** @type {{success: boolean, data: MainPageData}} */
	const response = await fetch('/api/mainPage', {
		method: 'PATCH',
		body: JSON.stringify(pageData),
	}).then((res) => res.json());

	if (response.success) {
		pageData = response.data;

		footerEditorState.set('success');
		setTimeout(() => {
			dispatch('update', pageData);
			footerEditorState.set('save');
			isFooterEditorOpen.set(false);
		}, 314);
	} else {
		footerEditorState.set('error');
		setTimeout(() => {
			footerEditorState.set('save');
		}, 3500);
	}
}
</script>

{#if open}
	<div class={'footer-editor ' + nativeClasses}>
		{#if isReady}
			<form
				{id}
				method="dialog"
				on:submit={() => isFooterEditorOpen.set(false)}
			/>
			<form
				class="form-common"
				on:submit|preventDefault={submitForm}>
				<div class="wrapper">
					<fieldset class="inputgroup">
						<Input
							bind:this={firstFocusElement}
							id="first-link-title"
							color="white"
							placeholder="Заголовок ссылки 1"
							round
							type="text"
							bind:value={pageData.pageLinks[0].name[$locale]}
						/>

						<Input
							id="first-link-value"
							color="white"
							placeholder="Ссылка 1"
							round
							type="text"
							bind:value={pageData.pageLinks[0].link}
						/>
					</fieldset>

					<fieldset class="inputgroup">
						<Input
							id="second-link-title"
							color="white"
							placeholder="Заголовок ссылки 2"
							round
							type="text"
							bind:value={pageData.pageLinks[1].name[$locale]}
						/>

						<Input
							id="second-link-value"
							color="white"
							placeholder="Ссылка 2"
							round
							type="text"
							bind:value={pageData.pageLinks[1].link}
						/>
					</fieldset>

					<fieldset class="inputgroup wide">
						<Input
							id="year"
							color="white"
							inputmode="numeric"
							placeholder="Год"
							round
							type="text"
							bind:value={pageData.year}
						/>

						<Textarea
							id="copyright"
							color="white"
							placeholder="Текст копирайта"
							round
							bind:value={pageData.copyright[$locale]}
						/>
					</fieldset>

					<fieldset class="inputgroup">
						<Input
							id="participate-link-title"
							color="white"
							placeholder="Текст кнопки"
							round
							type="text"
							bind:value={pageData.pageLinks[2].name[$locale]}
						/>

						<Input
							id="participate-link-value"
							color="white"
							placeholder="Ссылка"
							round
							type="text"
							bind:value={pageData.pageLinks[2].link}
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
						type="submit"
						on:blur={blurLastElement}>
						{$_('button.cancel')}
					</Button>
				</div>
			</form>
		{/if}
	</div>
{/if}

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
		background-color: var(--color-black);
		border-radius: 15px;
		margin: 0 auto;
		box-sizing: border-box;
		padding: 20px;
		margin: 0 auto;
		width: 100%;
		box-sizing: border-box;
		max-width: 1315px;
		border: 2px solid var(--color-white);
		box-shadow: 0px 4px 4px 0px
			color-mix(in srgb, var(--color-black) 50%, var(--color-white) 50%);
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
