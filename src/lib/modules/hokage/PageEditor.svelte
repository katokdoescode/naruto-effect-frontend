<script>
	import TextEditor from '$lib/modules/TextEditor.svelte';
	import Input from '$lib/ui/Input.svelte';
	import Textarea from '$lib/ui/Textarea.svelte';
	import { createEventDispatcher } from 'svelte';
	import { locale } from 'svelte-i18n';

	export let localValue;
	const dispatch = createEventDispatcher();
	$: dispatch('input', localValue);
</script>

{#if localValue.title}
	<Textarea
		id="contentTitleEditor"
		nativeClass="h"
		bind:value={localValue.title[$locale]}
	/>
{/if}

{#if localValue.videoLink}
	<Input
		id="contentVideoEditor"
		simple
		bind:value={localValue.videoLink} />
{/if}

{#if localValue.text}
	<TextEditor
		id="contentPageEditor"
		bind:value={localValue.text[$locale]} />
{/if}
