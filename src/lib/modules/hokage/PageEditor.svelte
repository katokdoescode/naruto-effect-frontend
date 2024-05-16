<script>
	import TextEditor from '$lib/modules/TextEditor.svelte';
	import MediaHandler from '$lib/modules/hokage/MediaHandler.svelte';
	import Textarea from '$lib/ui/Textarea.svelte';
	import { createEventDispatcher } from 'svelte';
	import { locale } from 'svelte-i18n';

	/** @type {MainPageData} */
	export let localValue;
	const dispatch = createEventDispatcher();
	$: dispatch('input', localValue);
</script>

<Textarea
	id="contentTitleEditor"
	nativeClass="h"
	bind:value={localValue.title[$locale]}
/>

<MediaHandler
	bind:link={localValue.banner.link}
	bind:alt={localValue.banner.alt}
	bind:iframe={localValue.iframe}
	bind:activeTab={localValue.bannerMode}
/>

<TextEditor
	id="contentPageEditor"
	bind:value={localValue.text[$locale]} />
