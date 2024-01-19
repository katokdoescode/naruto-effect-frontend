<script>
	import { createEventDispatcher } from 'svelte';

	/** @type {boolean} */
	export let simple = false;

	/** @type {boolean} */
	export let round = false;

	/** @type {string} */
	export let value = '';

	/** @type {'text'|'password'|'phone'|'email'|'number' } */
	export let type = 'text';

	/** @type {string|null} */
	export let placeholder = null;

	/** @type {string} */
	export let id;

	/** @type {string} */
	export let label = null;

	/** @type {string} */
	export let autocomplete = 'off';

	/** @type {string} */
	export let nativeClass = '';

	export function focus() {
		element.focus();
	}

	let element;

	const dispatch = createEventDispatcher();
	$: dispatch('input', value);
	$: classes = `${nativeClass} input ${simple ? 'simple' : ''} ${
		round ? 'round' : ''
	}`;
</script>

{#if !simple && !round}
	<label class="input">
		<input
			bind:this={element}
			{id}
			name={id}
			class="real-input"
			{autocomplete}
			{placeholder}
			{type}
			{value}
			{...$$restProps}
		/>

		<span class="label">
			<slot name="label">
				{#if label}
					{label}
				{/if}
			</slot>
		</span>

		<span class="error">
			<slot name="error" />
		</span>
	</label>
{:else}
	<input
		bind:this={element}
		{id}
		name={id}
		class={classes}
		{placeholder}
		bind:value
	/>
{/if}

<style scoped>
	.input {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: max-content 1fr max-content;
		width: 100%;
	}

	.input:focus-visible {
		outline-offset: -1px;
	}

	.input.simple {
		border: none;
		padding: 0;
		margin: 0;
		width: 100%;
		font-size: 1em;
		background: inherit;
	}

	.input.round {
		border-radius: 8px;
		padding: 5px 8px;
		background-color: var(--color-bg-main);
		color: var(--color-main);
		font-size: 1em;
		box-sizing: border-box;
		border: none;
	}

	.label {
		order: 1;
	}

	.real-input {
		order: 2;
		border: none;
		border-bottom: 2px solid var(--color-main);
		background-color: var(--color-bg-main);
		width: 100%;
		font-size: 1.6em;
	}

	.error {
		order: 3;
	}
</style>
