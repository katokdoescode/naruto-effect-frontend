<script>
	import { Placeholder } from '$lib/constants';
	import TextEditor from '$lib/modules/TextEditor.svelte';
	import Input from '$lib/ui/Input.svelte';
	import Textarea from '$lib/ui/Textarea.svelte';
	import { createEventDispatcher } from 'svelte';
	import { _, locale } from 'svelte-i18n';

	/** @type {Practice} */
	export let localValue;
	const dispatch = createEventDispatcher();
	$: dispatch('input', localValue);
</script>

<Textarea
	id="practiceTitle"
	nativeClass="h"
	placeholder={$_('placeholder.practice.name')}
	bind:value={localValue.title[$locale]}
/>
<Textarea
	id="practiceSubtitle"
	nativeClass="h next"
	placeholder={$_('placeholder.practice.subtitle')}
	bind:value={localValue.subtitle[$locale]}
/>
<Input
	id="practiceVideoLink"
	placeholder={$_('placeholder.practice.video')}
	simple
	bind:value={localValue.videoLink}
/>
<TextEditor
	id="practiceDescription"
	placeholder={Placeholder.practice[$locale]}
	bind:value={localValue.description[$locale]}
/>
