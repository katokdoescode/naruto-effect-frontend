<script>
import { Placeholder } from '$lib/constants';
import TextEditor from '$lib/modules/TextEditor.svelte';
import Textarea from '$lib/ui/Textarea.svelte';
import { debounce } from '$lib/utils/debounce';
import { createEventDispatcher, onMount } from 'svelte';
import { _, locale } from 'svelte-i18n';

const dispatch = createEventDispatcher();

/** @type {Participant} */
export let localValue;
const DRAFT_KEY = 'participant-draft';

let participantDraft;

function getCurrentTime() {
	const now = new Date();
	return now.getTime();
}

const debouncedUpdate = debounce(updateDraft, 999);
function updateDraft() {
	const oldValue = localStorage.getItem(DRAFT_KEY);
	if (oldValue) {
		participantDraft = localStorage.setItem(
			DRAFT_KEY,
			JSON.stringify(localValue),
		);
	}
}

$: localValue &&
	(() => {
		console.info('Update storage', localValue);
		debouncedUpdate();
	})();
$: dispatch('input', localValue);

onMount(() => {
	console.info('mounted');
	participantDraft = JSON.parse(localStorage.getItem(DRAFT_KEY));

	if (participantDraft) {
		console.info('Draft found');

		if (confirm('Draft found, do you want to restore last version?')) {
			console.info(localValue, participantDraft);
			localValue = { ...participantDraft };
			console.info(localValue, participantDraft);
		}
	} else {
		participantDraft = localStorage.setItem(
			DRAFT_KEY,
			JSON.stringify(localValue),
		);
	}
});
</script>

<Textarea
	id="practiceTitle"
	nativeClass="h"
	placeholder={$_('placeholder.participant.name')}
	bind:value={localValue.name[$locale]}
/>

<Textarea
	id="practiceSubtitle"
	nativeClass="h next"
	placeholder={$_('placeholder.participant.title')}
	bind:value={localValue.title[$locale]}
/>

<TextEditor
	id="practiceDescription"
	placeholder={Placeholder.participant[$locale]}
	bind:value={localValue.description[$locale]}
/>
