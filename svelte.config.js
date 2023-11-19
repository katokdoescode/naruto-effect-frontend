import adapter from '@sveltejs/adapter-auto';
import copy from 'rollup-plugin-copy';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	plugins: [
		copy({
			targets: [{ src: 'node_modules/tinymce/*', dest: 'public/tinymce' }]
		})
	],
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
