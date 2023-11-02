<script>
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
</script>

<section
	id="panel-content"
	class="panel">
	<Header />

	<main class="main-page-content">
		<slot />
	</main>

	<slot name="login" />
	<Footer />
</section>

<style scoped>
	#panel-content {
		display: grid;
		grid-template-rows: max-content minmax(0, 1fr) max-content;

		min-width: var(--min-center-section-width);
		max-width: var(--max-center-section-width);
		width: 100%;
	}
	.main-page-content::-webkit-scrollbar {
		display: none;
	}
	.main-page-content {
		overflow: hidden auto;
		scrollbar-width: none;
	}
</style>
