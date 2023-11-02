<script>
	import YouTube from '$lib/modules/YouTube.svelte';
	import { locale } from 'svelte-i18n';

	let lang;
	locale.subscribe((l) => (lang = l));

	/* eslint-disable svelte/no-at-html-tags */
	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {MainPageData} */
	const pageData = data?.pageData;

	const videoLink = pageData?.videoLink;
</script>

<h1 class="main-header">{pageData.title[lang]}</h1>
<YouTube link={videoLink} />
<article class="main-article">
	{@html pageData.text[lang]}
</article>

<style scoped>
	.main-header {
		margin-top: 62px;
	}
</style>
