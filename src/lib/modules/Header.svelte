<script>
	import { page } from '$app/stores';
</script>

<header class="content-header no-mobile">
	<a
		class:active={$page.url.pathname.includes('/cv')}
		href="/cv">CV</a>
</header>

<style scoped>
	.content-header {
		width: 100%;
		font-size: var(--font-main-menu-size);
		font-weight: var(--font-menu-weight);
	}
</style>
