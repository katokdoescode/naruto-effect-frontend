<script>
	import { createEventDispatcher } from 'svelte';

	/** @type {string} */
	export let value = '';

	/** @type {string} */
	export let id;

	/** @type {string} */
	export let placeholder = '';

	/** @type {string} */
	export let nativeClass = '';

	/** @type {'none'|'both'|'horizontal'|'vertical'} */
	export let resize = 'none';

	/** @type {boolean} */
	export let round = false;

	/** @type {boolean} */
	export let bordered = false;

	/** @type {'white'|'black'|undefined} */
	export let color = undefined;

	let element;

	export function clearValue() {
		value = '';
	}

	/** Updates textarea height based on content */
	export function updateHeight() {
		if (!element) return;
		element.style.height = 'auto';
		element.style.height = element.scrollHeight + 'px';
	}

	const dispatch = createEventDispatcher();

	$: dispatch('input', value);
	$: if (element) updateHeight();
	$: classes = `${nativeClass} textarea ${round ? 'round' : ''} ${
		bordered ? 'bordered' : ''
	} ${color ? color : ''} ${resize ? resize : ''}`;
</script>

<textarea
	bind:this={element}
	{id}
	class={classes}
	{placeholder}
	bind:value
	on:input={updateHeight}
	{...$$restProps}
/>

<style scoped>
	.textarea {
		border: none;
		width: 100%;
		min-height: 2em;
		resize: none;
		overflow-y: hidden;
		background: inherit;
	}

	.textarea:focus-visible {
		outline-offset: -1px;
	}

	.textarea.both {
		resize: both;
	}

	.textarea.vertical {
		resize: vertical;
	}

	.textarea.horizontal {
		resize: both;
	}

	.textarea.bordered {
		border: 1px solid var(--color-main);
	}

	.textarea.bordered:focus-visible {
		outline-offset: 2px;
	}

	.textarea.round {
		border-radius: 8px;
		padding: 5px 8px;
		background-color: var(--color-bg-main);
		color: var(--color-main);
		font-size: 1em;
		box-sizing: border-box;
	}

	.textarea.white {
		background-color: var(--color-white);
		color: var(--color-black);
	}

	.textarea.black {
		background-color: var(--color-black);
		color: var(--color-white);
	}
</style>
