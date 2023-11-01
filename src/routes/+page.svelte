<script>
	import YouTube from '$lib/modules/YouTube.svelte';

	/* eslint-disable svelte/no-at-html-tags */
	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {MainPageData} */
	const pageData = data?.pageData;

	const videoLink = pageData?.videoLink;
</script>

<h1 class="main-header">{pageData.title}</h1>
<YouTube link={videoLink} />
<article class="main-article">
	{@html pageData.text}
</article>

<style scoped>
	.main-header {
		margin-top: 62px;
	}
</style>
