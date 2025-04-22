<script>
import { Placeholder } from '$lib/constants';
import TextEditor from '$lib/modules/TextEditor.svelte';
import Input from '$lib/ui/Input.svelte';
import Textarea from '$lib/ui/Textarea.svelte';
import { createEventDispatcher } from 'svelte';
import { _, locale } from 'svelte-i18n';

/** @type {Project} */
export let localValue;
export let slugIsReadOnly = false;
const dispatch = createEventDispatcher();
$: dispatch('input', localValue);
</script>

<Input
	id="projectSlug"
	nativeClass="h"
	placeholder={$_('placeholder.project.slug')}
	bind:value={localValue.slug}
	readonly={slugIsReadOnly}
/>

<Textarea
	id="projectTitle"
	nativeClass="h"
	placeholder={$_('placeholder.project.name')}
	bind:value={localValue.name[$locale]}
/>

<Textarea
	id="projectSubtitle"
	nativeClass="h next"
	placeholder={$_('placeholder.project.title')}
	bind:value={localValue.title[$locale]}
/>

<TextEditor
	id="projectDescription"
	placeholder={Placeholder.participant[$locale]}
	bind:value={localValue.description[$locale]}
/>
