<script>
	/* eslint-disable svelte/no-at-html-tags */
	import YouTube from '$lib/modules/YouTube.svelte';
	import { locale } from 'svelte-i18n';

	export let data;

	/** @type {Practice} */
	$: practice = data?.practice;
</script>

<h1 class="main-header">{practice.title[$locale]}</h1>
<h2 class="main-header">{practice.subtitle[$locale]}</h2>

<YouTube link={practice.videoLink} />

<article class="main-article">
	{@html practice.description[$locale]}
</article>
