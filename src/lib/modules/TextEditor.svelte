<script>
/* eslint-disable svelte/no-at-html-tags */
import Editor from '@tinymce/tinymce-svelte';
import { createEventDispatcher, getContext, onDestroy } from 'svelte';

/** @type{object} */
export let addConf = {};

/** @type{boolean | undefined} */
export let inline = false;

/** @type{boolean} */
export let disabled = false;

/** @type{string} */
export let id;

/** @type{string} */
export let value;

/** @type{string|boolean} */
export let placeholder = 'Type here...';

const appColorScheme = getContext('appColorScheme');
let skinUrl = `/styles/tinymce/Naruto/${$appColorScheme}`;

const apiKey = import.meta.env.VITE_TINYMCE_API_KEY;

let conf = {
	height: inline ? 'max-content' : '100%',
	toolbar:
		'bold fontsize align italic list underline strikethrough link codesample image hr undo',
	menubar: false,
	branding: false,
	statusbar: false,
	images_file_types: 'jpg,png,webp',
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
