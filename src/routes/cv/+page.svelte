<script>
	import { locale } from 'svelte-i18n';
	/* eslint-disable svelte/no-at-html-tags */
	/** @type {import('./$types').PageData} */
	export let data;

	let cvData = data?.cvData || undefined;
</script>

<h1>{cvData.title[$locale]}</h1>
<article class="main-article">
	{@html cvData.text[$locale]}
</article>
