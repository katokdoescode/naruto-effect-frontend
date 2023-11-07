<script>
	/**
	 * @type {'text'|'password'|'phone'|'email'|'number' }
	 */
	export let type = 'text';

	/**
	 * @type {string|null}
	 */
	export const placeholder = null;

	/**
	 * @type {string}
	 */
	export let name;

	/**
	 * @type {?string}
	 */
	export let label = undefined;

	/**
	 * @type {string}
	 */
	export let value = '';
	/**
	 * @type {string}
	 */
	export let autocomplete = 'off';

	/**
	 *
	 * @param {Event & { currentTarget: EventTarget & HTMLInputElement; }} event
	 */
	function handleInput(event) {
		const { currentTarget } = event;

		value = type.match(/^(number|range)$/)
			? currentTarget.value
			: currentTarget.value;
	}
</script>

<label class="input">
	<input
		{name}
		class="real-input"
		{autocomplete}
		{placeholder}
		{type}
		on:input={handleInput}
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

<style scoped>
	.input {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: max-content 1fr max-content;
		width: 100%;
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
