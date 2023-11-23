<script>
	import { createEventDispatcher } from 'svelte';

	/** @type {boolean} */
	export let simple = false;

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

	const dispatch = createEventDispatcher();
	$: dispatch('input', value);
</script>

{#if !simple}
	<label class="input">
		<input
			{id}
			name={id}
			class="real-input"
			{autocomplete}
			{placeholder}
			{type}
			{value}
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
		{id}
		name={id}
		class="input simple"
		{placeholder}
		bind:value />
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

		line-height: inherit;
		font: inherit;
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

		font-size: 24px;
		/* TODO: change size */
	}

	.error {
		order: 3;
	}
</style>
