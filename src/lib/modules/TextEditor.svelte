<script>
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
	export let value = '';

	/** @type{string} */
	export let placeholder = 'Type here...';

	let conf = {
		height: inline ? 'max-content' : '100%',
		toolbar: false,
		menubar: false,
		branding: false,
		statusbar: false,
		contextmenu: inline
			? false
			: 'redo fontsize bold h2 h3 hr italic underline strikethrough link lists',
		resize: false,
		content_css: 'N',
		skin: 'Naruto',
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
		width: 100%;
		height: 100%;
	}

	.editor-wrapper.inline {
		height: auto;
	}
	:global(.tinymce-wrapper) {
		width: 100%;
		height: 100%;
	}
</style>
