<script>
	/* eslint-disable svelte/no-at-html-tags */
	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {MainPageData} */
	const pageData = data.pageData;
</script>

<h1>{pageData.title}</h1>
<article>
	{@html pageData.text}
</article>
