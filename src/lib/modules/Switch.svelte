<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let checked = false;
</script>

<input
	type="checkbox"
	bind:checked
	on:change={() => dispatch('change', !checked)}
/>

<style>
	input {
		--s: 31px;
		--color: #808080;

		height: var(--s);
		padding: calc(var(--s) / 10);
		box-sizing: content-box;
		aspect-ratio: 2;
		border-radius: var(--s);
		background:
			radial-gradient(farthest-side, var(--color-bg-main) 97%, transparent)
				left/var(--s) 100% content-box no-repeat,
			var(--color);
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		cursor: pointer;
		transition: 0.3s;
	}
	input:checked {
		background-position: right;
		background-color: var(--color-main);
	}
</style>
