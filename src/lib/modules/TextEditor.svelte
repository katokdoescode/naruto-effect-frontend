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
		height: '100%',
		toolbar: false,
		menubar: false,
		branding: false,
		statusbar: false,
		contextmenu:
			'redo fontsize bold h2 h3 hr italic underline strikethrough link lists',
		resize: false,
		content_css: 'default',
		font_css: '/styles/fonts.css',
		plugins: ['autolink', 'lists', 'link'],
		...addConf,
		placeholder
	};

	const dispatch = createEventDispatcher();
	$: dispatch('input', value);
</script>

<svelte:head>
	<script src="/node_modules/tinymce/tinymce.min.js"></script>
</svelte:head>

<div class="editor-wrapper">
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
	:global(.tinymce-wrapper) {
		width: 100%;
		height: 100%;
	}
</style>
