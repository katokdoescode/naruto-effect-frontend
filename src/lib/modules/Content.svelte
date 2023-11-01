<script>
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
</script>

<section id="panel-content" class="panel">
	<Header />

	<main class="main-page-content">
		<slot />
	</main>

	<slot name="login" />
	<Footer />
</section>

<style scoped>
	#panel-content {
		background-color: rgba(100, 100, 200, 0.2);
		display: grid;
		grid-template-rows: minmax(0, 1fr) max-content;
	}
	.main-page-content::-webkit-scrollbar {
		display: none;
	}
	.main-page-content {
		background-color: rgba(100, 200, 200, 0.2);
		overflow: hidden auto;
		scrollbar-width: none;
	}
</style>
