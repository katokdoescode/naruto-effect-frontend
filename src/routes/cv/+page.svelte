<script>
import CvPageEditor from '$lib/modules/hokage/CvPageEditor.svelte';
import { getContext } from 'svelte';
import { locale } from 'svelte-i18n';
/* eslint-disable svelte/no-at-html-tags */
/** @type {import('./$types').PageData} */
export let data;

const isEditingState = getContext('isEditingState');
const cvPage = getContext('cvPage');

let cvData = data?.cvData || undefined;
let localValue = cvData;

cvPage.set(cvData);
$: cvPage.set(localValue);
</script>

{#if $isEditingState}
	<CvPageEditor bind:localValue />
{:else}
	<h1>{cvData.title[$locale]}</h1>
	<article class="main-article">
		{@html cvData.text[$locale]}
	</article>
{/if}
