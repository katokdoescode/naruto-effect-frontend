<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import ShadowWrapper from './ShadowWrapper.svelte';
	const isContentPageEditing = writable();
	const contentPageStatus = writable();
	const contentPage = writable();

	isContentPageEditing.set(false);

	setContext('isContentPageEditing', isContentPageEditing);
	setContext('contentPageStatus', contentPageStatus);
	setContext('contentPage', contentPage);

	async function saveContent() {
		contentPageStatus.set('loading');

		const response = await fetch('/api/mainPage', {
			method: 'PATCH',
			body: JSON.stringify($contentPage)
		}).then((data) => data.json());

		if (response.success) {
			isContentPageEditing.set(false);
			contentPageStatus.set('success');
			setTimeout(() => contentPageStatus.set(null), 2500);
		} else {
			contentPageStatus.set('error');
			setTimeout(() => contentPageStatus.set(null), 3500);
		}
	}
</script>

<section
	id="panel-content"
	class="panel">
	<Header on:save={saveContent} />

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

		position: relative;

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
		width: 100%;
	}
</style>
