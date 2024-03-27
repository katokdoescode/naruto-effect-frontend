<script>
	/** @type {string} */
	export let message = '';

	/** @type{string} */
	export let tag = 'h3';
</script>

<article class="alert-message">
	<svelte:element
		this={tag}
		class="message-heading">
		{message}
	</svelte:element>
</article>

<style scoped>
	.alert-message {
		font-size: var(--font-main-menu-size);
		font-weight: 700;
		background-color: var(--color-gray);
		color: var(--color-black);
		border-radius: 15px;
		padding: 20px;
		box-shadow: 0 4px 4px 0 #000;
		margin: 0 4px;
	}

	.message-heading {
		margin: 0;
		padding: 0;
	}
</style>
