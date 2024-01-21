<script>
	import { page } from '$app/stores';
	import SignOut from '$lib/modules/hokage/SignOut.svelte';
	import { createEventDispatcher, getContext } from 'svelte';
	import ToggleEditMode from './hokage/ToggleEditMode.svelte';

	const dispatch = createEventDispatcher();

	const authorized = getContext('authorized');
</script>

<header class="content-header no-mobile">
	<div class="row">
		<a
			class:active={$page.url.pathname.includes('/cv')}
			href="/cv">CV</a>

		{#if $authorized}
			<SignOut on:logout={() => dispatch('logout')} />
		{/if}
	</div>

	{#if $authorized}
		<ToggleEditMode on:update={({ detail }) => dispatch('update', detail)} />
	{/if}
</header>

<style scoped>
	.content-header {
		display: flex;
		flex-direction: column;
		row-gap: 62px;
		width: 100%;
		font-size: var(--font-main-menu-size);
		font-weight: var(--font-menu-weight);
	}

	.content-header .row {
		display: flex;
		justify-content: space-between;
	}
</style>
