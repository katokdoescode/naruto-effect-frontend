<script>
	import { createEventDispatcher } from 'svelte';

	/** @type{string} */
	export let value = '';

	/** @type{string} */
	export let id;

	/** @type{string} */
	export let placeholder = '';

	/** @type{string} */
	export let nativeClass = '';

	/** @type{boolean} */
	export let resize = false;

	/** @type{boolean} */
	export let round = false;

	let element;

	/** Updates textarea height based on content */
	function updateHeight({ target }) {
		if (!target) return;
		target.style.height = 'auto';
		target.style.height = target.scrollHeight + 'px';
	}

	const dispatch = createEventDispatcher();

	$: dispatch('input', value);
	$: if (element) updateHeight({ target: element });
	$: classes = `${nativeClass} textarea ${round ? 'round' : ''}`;
</script>

<textarea
	bind:this={element}
	{id}
	class={classes}
	class:resize
	{placeholder}
	bind:value
	on:input={updateHeight}
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

	.textarea.resize {
		resize: both;
	}

	.textarea.round {
		border-radius: 8px;
		padding: 5px 8px;
		background-color: var(--color-bg-main);
		color: var(--color-main);
		font-size: 1em;
		box-sizing: border-box;
	}
</style>
