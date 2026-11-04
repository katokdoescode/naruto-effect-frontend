<script>
import { page } from '$app/stores';
import Button from '$lib/ui/Button.svelte';
import { uploadFile } from '$lib/utils/files';
import { _ } from 'svelte-i18n';
import { fade } from 'svelte/transition';

const acceptable = {
	images: 'image/*',
};

/** @type{'images'} */
export let type = 'images';

/** @type{string} */
export let id = 'file';

/** @type{number} */
export let tabindex = 0;

/** @type{string|null} */
export let link;

/** @type{string|undefined}*/
let errorText;

/** @type{'success'|'error'|null}*/
let status;

/** @type{HTMLInputElement}*/
let input;

let isLoading = false;

/**
 * Uploading file to the storage
 * @param {File} file
 */
async function upload(file) {
	isLoading = true;

	try {
		const { url, error } = await uploadFile(file, {
			type,
			prefix: $page.params?.slug,
			replaceUrl: link,
		});

		if (error) {
			console.error(error);
			status = 'error';
		} else {
			status = 'success';
			link = url;
		}
	} finally {
		isLoading = false;
		setTimeout(() => {
			status = null;
		}, 2500);
	}
}

function onUpload({ target }) {
	errorText = null;
	const file = target.files[0];
	if (!file) return;

	// 4mb
	if (file.size / 1000000 > 4) {
		status = 'error';
		errorText = $_('errors.sizeLimit');
		setTimeout(() => {
			status = null;
		}, 2500);
		setTimeout(() => {
			errorText = null;
		}, 5000);
		return;
	}

	upload(file);
}

function raiseUploading() {
	input.click();
}

/** @type{'red'|'green'|'gray'} */
$: buttonColor =
	status === 'success' ? 'green' : status === 'error' ? 'red' : 'gray';
</script>

<div class="file-uploader">
	<Button
		color={buttonColor}
		nativeClasses="visible-button"
		{tabindex}
		on:click={raiseUploading}
	>
		{#if isLoading}
			{$_('button.uploading')}
		{:else}
			{$_('button.upload')}
		{/if}
	</Button>

	<input
		bind:this={input}
		{id}
		name={id}
		class="input-file"
		accept={acceptable[type]}
		type="file"
		on:change={onUpload}
	/>
	{#if errorText}
		<span
			class="error-text"
			in:fade
			out:fade>{errorText}</span>
	{/if}
</div>

<style scoped>
	.file-uploader {
		position: relative;
	}

	.file-uploader .input-file {
		position: absolute;
		opacity: 1;
		top: 0;
		left: 0;
		opacity: 0;
		z-index: -1;
	}

	:global(.file-uploader .visible-button) {
		height: 100%;
		width: 100%;
	}

	.file-uploader .error-text {
		font-size: var(--font-second-menu-size);
		background-color: var(--color-main);
		color: var(--color-bg-main);
		border-radius: 5px;
		position: absolute;
		border: none;
		padding: 5px;
		top: 120%;
		left: 0;
	}
</style>
