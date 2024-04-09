<script>
	/* eslint-disable svelte/no-at-html-tags */
	/** @type{string|null}*/
	export let link = null;

	/** @type{string|null}*/
	export let markup = null;

	function getLink(url) {
		if (!url) return '';
		const regExp =
			/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
		const match = url.match(regExp);

		const id = match && match[2].length === 11 ? match[2] : null;

		return `//www.youtube.com/embed/${id}`;
	}
	$: src = getLink(link);
</script>

{#if src}
	<iframe
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		allowfullscreen
		frameborder="0"
		height="317"
		{src}
		title="YouTube video player"
		width="100%"
	/>
{:else if markup}
	<div class="player-wrapper">
		{@html markup}
	</div>
{/if}

<style scoped>
	.player-wrapper {
		width: 100%;
		height: 317px;
	}

	:global(.player-wrapper iframe) {
		width: inherit;
		height: inherit;
	}
</style>
