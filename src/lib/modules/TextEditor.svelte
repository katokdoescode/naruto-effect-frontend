<script>
	/* eslint-disable svelte/no-at-html-tags */
	import Editor from '@tinymce/tinymce-svelte';
	import { createEventDispatcher } from 'svelte';

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

	let conf = {
		height: inline ? 'max-content' : '100%',
		toolbar: false,
		menubar: false,
		branding: false,
		statusbar: false,
		contextmenu: inline
			? false
			: 'bold fontsize align italic list underline strikethrough link hr undo', // indent и выбор параграфа
		resize: false,
		content_css: '',
		skin_url: '/styles/tinymce/ui/Naruto',
		font_css: '/styles/fonts.css',
		plugins: ['autolink', 'lists', 'link'],
		...addConf,
		placeholder
	};

	const dispatch = createEventDispatcher();
	$: dispatch('input', value);
</script>

<div
	class="editor-wrapper"
	class:inline>
	{#if !value && placeholder}
		<article class="editor-placeholder">
			{#if inline}
				{@html placeholder}
			{:else}
				{placeholder}
			{/if}
		</article>
	{/if}

	<Editor
		{id}
		{conf}
		{disabled}
		{inline}
		scriptSrc="/tinymce/tinymce.min.js"
		bind:value
	/>
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
