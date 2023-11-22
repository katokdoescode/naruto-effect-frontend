<script>
	/* eslint-disable svelte/no-at-html-tags */
	import { locale } from 'svelte-i18n';

	export let data;

	/** @type {Participant} */
	$: participant = data?.participant;
</script>

<h1 class="main-header">{participant.name[$locale]}</h1>
<h2 class="main-header">{participant.title[$locale]}</h2>
<article class="main-article">
	{@html participant.description[$locale]}
</article>
