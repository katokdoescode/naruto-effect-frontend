<script>
	import TextEditor from '$lib/modules/TextEditor.svelte';
	import Textarea from '$lib/ui/Textarea.svelte';
	import { createEventDispatcher } from 'svelte';
	import { locale } from 'svelte-i18n';

	/** @type {CvData} */
	export let localValue;
	const dispatch = createEventDispatcher();
	$: dispatch('input', localValue);
</script>

<Textarea
	id="contentTitleEditor"
	nativeClass="h"
	bind:value={localValue.title[$locale]}
/>

<TextEditor
	id="contentPageEditor"
	bind:value={localValue.text[$locale]} />
