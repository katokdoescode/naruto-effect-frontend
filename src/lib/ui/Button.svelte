<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	/** @type{string|null} id */
	export let id = null;

	/** @type{"button" | "submit" | "reset" | null | undefined} type */
	export let type = 'button';

	/** @type {boolean} Will have border */
	export let bordered = false;

	/** @type {boolean} Will have active state styles */
	export let active = false;

	$: classes = `button ${bordered ? 'bordered' : ''} ${active ? 'active' : ''}`;

	function click(event) {
		dispatch('click', event);
	}
</script>

<button
	{id}
	class={classes}
	{type}
	{...$$restProps}
	on:click={click}>
	<slot />
</button>

<style scoped>
	.button {
		padding: 0;
		margin: 0;
		background-color: transparent;
		color: var(--color-main);
		font-weight: var(--font-menu-weight);
		border: none;
		cursor: pointer;
	}

	.button:not(.bordered).active {
		text-decoration: underline;
		text-underline-offset: 3px;
		text-decoration-thickness: 2px;
	}
</style>
