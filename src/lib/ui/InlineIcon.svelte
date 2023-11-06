<script>
	/* eslint-disable svelte/no-at-html-tags */
	import { onMount } from 'svelte';

	export let src;
	let svgContent = '';

	onMount(async () => {
		const response = await fetch(src);
		svgContent = await response.text();
	});
</script>

{@html svgContent}
