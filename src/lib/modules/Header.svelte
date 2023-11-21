<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Button from '$lib/ui/Button.svelte';
	import { createEventDispatcher, getContext } from 'svelte';
	import { _ } from 'svelte-i18n';
	const dispatch = createEventDispatcher();
	const authorized = getContext('authorized');
	const isContentPageEditing = getContext('isContentPageEditing');
	const contentPageStatus = getContext('contentPageStatus');

	async function signOut() {
		return async ({ result }) => {
			if (result.success) {
				authorized.set(false);
			}
		};
	}

	let isEditing = false;
	isContentPageEditing.subscribe((x) => {
		isEditing = x;
	});

	let status;
	contentPageStatus.subscribe((x) => {
		status = x;
	});

	$: btnStatus = function () {
		if (status) {
			return status;
		} else {
			return isEditing ? 'save' : 'edit';
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
		if (isEditing) {
			dispatch('save');
			return;
		}

		isContentPageEditing.set(true);
	}
</script>

<header class="content-header no-mobile">
	<div class="row">
		<a
			class:active={$page.url.pathname.includes('/cv')}
			href="/cv">CV</a>

		{#if $authorized}
			<div class="signout">
				<span>{$_('hokagemode')}</span>
				<form
					action="/api/signOut"
					method="POST"
					use:enhance={signOut}>
					<Button
						color="black"
						type="submit">{$_('signOut')}</Button>
				</form>
			</div>
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

	.content-header .signout {
		display: grid;
		grid-template-columns: repeat(2, max-content);
		gap: 21px;
		place-items: flex-start;
	}
</style>
