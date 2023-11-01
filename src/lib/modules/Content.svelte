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
		flex: 1 1 var(--min-center-section-width);
		padding: 0 var(--sections-padding);
		max-width: var(--max-center-section-width);
		min-width: var(--min-center-section-width);
	}

	#panel-content {
		display: grid;
		grid-template-rows: minmax(0, 1fr) max-content;
	}

	@media (width <= 1018px) {
		#panel-content {
			padding-top: var(--left-section-span-height);
		}
	}

	.main-page-content::-webkit-scrollbar {
		display: none;
	}

	.main-page-content {
		overflow: hidden auto;
		padding-top: calc(var(--initial-padding-top) + 40px);
		padding-bottom: 114px;
		scrollbar-width: none;
	}

	@media (width <=1018px) {
		.main-page-content {
			padding-bottom: 0;
		}
	}
</style>
