<script>
import { Placeholder } from '$lib/constants';
import TextEditor from '$lib/modules/TextEditor.svelte';
import MediaHandler from '$lib/modules/hokage/MediaHandler.svelte';
import Textarea from '$lib/ui/Textarea.svelte';
import { createEventDispatcher } from 'svelte';
import { _, locale } from 'svelte-i18n';

const dispatch = createEventDispatcher();

/** @type {Practice} */
export let localValue;
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
<MediaHandler
	bind:link={localValue.banner.link}
	bind:alt={localValue.banner.alt}
	bind:iframe={localValue.iframe}
	bind:activeTab={localValue.bannerMode}
/>
<TextEditor
	id="practiceDescription"
	placeholder={Placeholder.practice[$locale]}
	bind:value={localValue.description[$locale]}
/>
