<script>
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import ShadowWrapper from './ShadowWrapper.svelte';
</script>

<section
	id="panel-content"
	class="panel">
	<Header />

	<ShadowWrapper noPads>
		<main class="main-page-content">
			<slot />
		</main>
	</ShadowWrapper>

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
		padding-top: 62px;
		padding-bottom: 10em;
		overflow: hidden auto;
		scrollbar-width: none;
	}
</style>
