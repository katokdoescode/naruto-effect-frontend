<script>
	/* eslint-disable svelte/no-at-html-tags */
	import { locale } from 'svelte-i18n';

	let lang;
	locale.subscribe((l) => (lang = l));

	export let data;

	/** @type {Participant} */
	$: participant = data?.participant;
</script>

<h1 class="main-header">{participant.name[lang]}</h1>
<h2 class="main-header">{participant.title[lang]}</h2>
<article class="main-article">
	{@html participant.description[lang]}
</article>
