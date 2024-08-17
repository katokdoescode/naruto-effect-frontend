<script>
import { Placeholder } from '$lib/constants';
import TextEditor from '$lib/modules/TextEditor.svelte';
import Textarea from '$lib/ui/Textarea.svelte';
import { createEventDispatcher } from 'svelte';
import { _, locale } from 'svelte-i18n';

/** @type {Project} */
export let localValue;
const dispatch = createEventDispatcher();
$: dispatch('input', localValue);
</script>

<Textarea
	id="practiceTitle"
	nativeClass="h"
	placeholder={$_('placeholder.project.name')}
	bind:value={localValue.name[$locale]}
/>

<Textarea
	id="practiceSubtitle"
	nativeClass="h next"
	placeholder={$_('placeholder.project.title')}
	bind:value={localValue.title[$locale]}
/>

<TextEditor
	id="practiceDescription"
	placeholder={Placeholder.participant[$locale]}
	bind:value={localValue.description[$locale]}
/>
