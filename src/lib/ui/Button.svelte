<script>
	/**
	 * @type{"button" | "submit" | "reset" | null | undefined} type
	 */
	export let type = 'button';
</script>

<button {type}>
	<slot />
</button>
