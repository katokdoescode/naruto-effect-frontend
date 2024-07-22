<script>
import { createEventDispatcher, getContext } from 'svelte';
import Footer from './Footer.svelte';
import Header from './Header.svelte';
import ShadowWrapper from './ShadowWrapper.svelte';
const dispatch = createEventDispatcher();

/**@type{MainPageData} */
export let pageDataObject = null;

const isEditingState = getContext('isEditingState');
isEditingState.set(false);
</script>

<section
	id="panel-content"
	class="panel">
	<Header
		on:update={({ detail }) => dispatch('update', detail)}
		on:logout={() => dispatch('logout')}
	/>

	<ShadowWrapper noPads>
		<main class="main-page-content">
			<slot />
		</main>
	</ShadowWrapper>

	<slot name="login" />
	<Footer
		copyright={pageDataObject?.copyright}
		year={pageDataObject?.year}
		on:submitFooter={() => dispatch('submitFooter')}
	/>
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
