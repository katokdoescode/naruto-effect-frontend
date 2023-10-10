import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';
import { fileURLToPath, URL } from 'node:url';
const env = loadEnv('develop', process.cwd());

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	server: {
		proxy: {
			'/api': {
				target: env.VITE_BFF_BASE_URL,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			},
		}
	}
});
