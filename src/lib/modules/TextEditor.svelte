<script>
import { appColorScheme } from '$lib/stores/themeStore';
/* eslint-disable svelte/no-at-html-tags */
import Editor from '@tinymce/tinymce-svelte';
import { createEventDispatcher, onDestroy } from 'svelte';

/** @type {object} */
export let addConf = {};

/** @type {boolean | undefined} */
export let inline = false;

/** @type {boolean} */
export let disabled = false;

/** @type {string} */
export let id;

/** @type {string} */
export let value;

/** @type {string|boolean} */
export let placeholder = 'Type here...';

let skinUrl = `/styles/tinymce/Naruto/${$appColorScheme}`;

const apiKey = import.meta.env.VITE_TINYMCE_API_KEY;
let tinymce;

function filePickerCallback(callback) {
	const input = document.createElement('input');
	input.setAttribute('type', 'file');
	input.setAttribute('accept', 'image/*');

	input.addEventListener('change', async (e) => {
		// @ts-ignore
		const file = e.target.files[0];
		const formData = new FormData();

		// 4mb
		if (file.size / 1000000 > 4) {
			callback('File is larger than 4 MB');
			return;
		}

		formData.append('file', file, file.name);
		formData.append('type', 'images');
		formData.append('prefix', 'editor');

		await (async () => {
			try {
				const res = await fetch('/api/files', {
					method: 'POST',
					body: formData,
				});
				const { url, error } = await res.json();
				if (error) {
					console.error(error);
					callback('Unexpected error from server');
					return;
				}
				callback(url);
			} catch (error) {
				console.error(error);
				callback('Unexpected error');
			}
		})();
	});

	input.click();
}

let conf = {
	height: inline ? 'max-content' : '100%',
	toolbar:
		'bold fontsize align italic list underline strikethrough link codesample image accordion hr undo',
	menubar: false,
	branding: false,
	statusbar: false,
	license_key: 'gpl',
	images_file_types: 'jpg,png,webp,avif',
	file_picker_callback: filePickerCallback,
	contextmenu: inline
		? false
		: 'bold fontsize align italic list underline strikethrough link hr undo', // indent и выбор параграфа
	resize: false,
	content_css: 'Naruto',
	font_css: '/styles/fonts.css',
	plugins: [
		'autolink',
		'lists',
		'link',
		'image',
		'accordion',
		'accordion',
		'codesample',
	],
	...addConf,
	placeholder,
};
const unsubscribeAppColorScheme = appColorScheme.subscribe(
	(/** @type {string} */ scheme) => {
		skinUrl = `/styles/tinymce/Naruto/${scheme}`;
		conf.skin_url = skinUrl;
	},
);

const dispatch = createEventDispatcher();
$: dispatch('input', value);

onDestroy(() => unsubscribeAppColorScheme());
</script>

<div
	class="editor-wrapper"
	class:inline>
	{#if !value && placeholder}
		<article class="editor-placeholder">
			{#if !inline}
				{@html placeholder}
			{:else}
				{placeholder}
			{/if}
		</article>
	{/if}
	{#key skinUrl}
		<Editor
			{id}
			{apiKey}
			{conf}
			{disabled}
			{inline}
			bind:this={tinymce}
			bind:value />
	{/key}
</div>

<style scoped>
	.editor-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
		min-height: 300px;
	}

	.editor-placeholder {
		position: absolute;
		top: 1em;
		opacity: 0.5;
		pointer-events: none;
		z-index: 1;
	}

	:global(.editor-placeholder > *:first-child) {
		margin-top: 0;
	}

	.editor-wrapper.inline {
		height: auto;
		min-height: initial;
	}

	:global(.tinymce-wrapper) {
		width: 100%;
		height: 100%;
	}
</style>
