<script>
	export let link = null;

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
{/if}
