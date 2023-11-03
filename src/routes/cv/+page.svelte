<script>
	import { locale } from 'svelte-i18n';

	let lang;
	locale.subscribe((l) => (lang = l));
	/* eslint-disable svelte/no-at-html-tags */
	/** @type {import('./$types').PageData} */
	export let data;

	let cvData = data?.cvData || undefined;
</script>

<h1 class="main-header">{cvData.title[lang]}</h1>
<article class="main-article">
	{@html cvData.text[lang]}
</article>
