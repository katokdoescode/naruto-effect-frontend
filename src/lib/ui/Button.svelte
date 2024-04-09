<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	/** @type{string|null} id */
	export let id = null;

	/** @type{"button" | "submit" | "reset" | null | undefined} type */
	export let type = 'button';

	/** @type {boolean} */
	export let disabled = false;

	/** @type {boolean} Will have active state styles */
	export let active = false;

	/** @type {"transparent"|"gray"|"black"|"green"|"red"|"white"} Color of the button */
	export let color = 'transparent';

	/** @type {"none"|"login"} Specific style of the button */
	export let styleType = 'none';

	/** @type {string} */
	export let href = null;

	/** @type {string} */
	export let nativeClasses = '';

	let button;

	$: classes = `button ${active ? 'active' : ''}`;

	$: if (color !== 'transparent') {
		classes = [
			...removeColorsFromClass(classes.split(' ')),
			'bordered',
			color,
			nativeClasses
		].join(' ');
	}

	$: if (styleType !== 'none') {
		classes += styleType;
	}

	function click(event) {
		dispatch('click', event);
	}

	function blur(event) {
		dispatch('blur', event);
	}

	export function nativeClick() {
		button.click();
	}

	/**
	 * Removes colors from classes array
	 * @param {string[]} classes
	 */
	function removeColorsFromClass(classes) {
		return classes.filter(
			(c) =>
				!['transparent', 'gray', 'black', 'green', 'red', 'white'].includes(c)
		);
	}
</script>

{#if href}
	<a
		{id}
		class={classes}
		{...$$restProps}
		{href}
		on:blur={blur}>
		<slot />
	</a>
{:else}
	<button
		bind:this={button}
		{id}
		class={classes}
		{disabled}
		{type}
		{...$$restProps}
		on:click={click}
		on:blur={blur}
	>
		<slot />
	</button>
{/if}

<style scoped>
	.button {
		padding: 0;
		margin: 0;
		background-color: transparent;
		color: var(--color-main);
		font-size: var(--font-main-menu-size);
		font-weight: var(--font-menu-weight);
		border: none;
		cursor: pointer;
	}

	.button:not(.bordered).active {
		text-decoration: underline;
		text-underline-offset: 3px;
		text-decoration-thickness: 2px;
	}

	.button.bordered {
		align-self: flex-start;
		border: 2px solid var(--color-gray);
		border-radius: 6px;
		padding: 0 21px;
		text-transform: lowercase;
	}

	.button.bordered.gray {
		border-color: var(--color-gray);
		background-color: var(--color-gray);
		color: var(--color-black);
	}

	.button.bordered.green {
		border-color: var(--color-green);
		background-color: var(--color-green);
		color: var(--color-black);
	}

	.button.bordered.red {
		border-color: var(--color-red);
		background-color: var(--color-red);
		color: var(--color-black);
	}

	.button.bordered.black {
		border-color: var(--color-main);
		background-color: var(--color-main);
		color: var(--color-bg-main);
	}

	.button.bordered.white {
		border-color: var(--color-main);
		background-color: var(--color-bg-main);
		color: var(--color-main);
	}

	.button.login {
		border-radius: 6px;
		padding: 8px 18px;
		background-color: var(--color-main);
		color: var(--color-bg-main);
		text-transform: lowercase;
	}

	.button.bordered:hover {
		filter: saturate(1.8);
	}

	.button.bordered:active {
		filter: saturate(0.5);
	}

	.button:disabled {
		cursor: not-allowed;
		opacity: 0.8;
	}
</style>
