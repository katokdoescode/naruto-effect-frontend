<script>
/* eslint-disable svelte/no-at-html-tags */
import { onMount } from 'svelte';

export let src;
export let nativeClass = '';
let svgContent = '';

onMount(async () => {
	const response = await fetch(src);
	svgContent = await response.text();

	if (nativeClass) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(svgContent, 'text/html');
		const element = doc.body.firstChild;

		// Possibly always be
		if (element instanceof Element) {
			for (const className of nativeClass.split(' ')) {
				if (className) element.classList.add(className);
			}

			svgContent = element.outerHTML;
		}
	}
});
</script>

{@html svgContent}
