<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	/**
	 * @type{"button" | "submit" | "reset" | null | undefined} type
	 */
	export let type = 'button';

	function click(event) {
		dispatch('click', event);
	}
</script>

<button {type} on:click={click}>
	<slot />
</button>
