<script>
	import Button from '$lib/ui/Button.svelte';
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';

	const acceptable = {
		image: 'image/*'
	};

	/** @type{'images'} */
	export let type = 'images';

	/** @type{string} */
	export let id = 'file';

	/** @type{number} */
	export let tabindex = 0;

	/** @type{string|null} */
	export let link;

	let status;
	let isLoading = false;
	let input;

	async function uploadFile(body) {
		isLoading = true;

		try {
			const { url, error } = await (
				await fetch('/api/files', { method: 'POST', body })
			).json();
			if (error) {
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
		const file = target.files[0];
		const formData = new FormData();
		formData.append('file', file, file.name);
		formData.append('type', type);
		formData.append('prefix', $page.params?.slug || null);
		uploadFile(formData);
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
		accept={acceptable.type}
		type="file"
		on:change={onUpload}
	/>
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
</style>
