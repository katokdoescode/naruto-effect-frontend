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
	 * @type {string}
	 */
	export let value = '';

	/**
	 *
	 * @param {Event & { currentTarget: EventTarget & HTMLInputElement; }} event
	 */
	function  handleInput(event) {
		const { currentTarget }  = event;

    value = type.match(/^(number|range)$/)
      ? currentTarget.value
      : currentTarget.value;
  };
</script>

<label class="input">
	<input
		class="real-input"
		type={type}
		{placeholder}
		{name}
		on:input={handleInput}
	/>

	<span class="label">
		<slot name="label">{ name }</slot>
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
}

.label {
	order: 1;
}

.real-input {
	order: 2;
}

.error {
	order: 3;
}
</style>
