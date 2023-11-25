<script>
	import { page } from '$app/stores';
	import SignOut from '$lib/modules/hokage/SignOut.svelte';
	import Button from '$lib/ui/Button.svelte';
	import { createEventDispatcher, getContext } from 'svelte';
	import { _ } from 'svelte-i18n';

	const dispatch = createEventDispatcher();

	const authorized = getContext('authorized');
	const isEditingState = getContext('isEditingState');
	const contentPageStatus = getContext('contentPageStatus');

	$: btnStatus = function () {
		if ($contentPageStatus) {
			return $contentPageStatus;
		} else {
			return $isEditingState ? 'save' : 'edit';
		}
	};

	$: btnColor = function () {
		if (btnStatus()) {
			switch (btnStatus()) {
				case 'success':
					return 'green';
				case 'error':
					return 'red';
				default:
					return 'gray';
			}
		}

		return 'gray';
	};

	function editContentPage() {
		if ($isEditingState) {
			dispatch('save');
			return;
		}

		isEditingState.set(true);
	}
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
		<div class="row">
			<Button
				color={btnColor()}
				on:click={editContentPage}>
				{$_(`button.${btnStatus()}`)}
			</Button>
		</div>
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
