<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Button from '$lib/ui/Button.svelte';
	import { getContext } from 'svelte';
	import { _ } from 'svelte-i18n';
	const authorized = getContext('authorized');

	async function signOut() {
		return async ({ result }) => {
			if (result.success) {
				authorized.set(false);
			}
		};
	}
</script>

<header class="content-header no-mobile">
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
</header>

<style scoped>
	.content-header {
		display: flex;
		justify-content: space-between;
		width: 100%;
		font-size: var(--font-main-menu-size);
		font-weight: var(--font-menu-weight);
	}

	.content-header .signout {
		display: grid;
		grid-template-columns: repeat(2, max-content);
		gap: 21px;
		place-items: flex-start;
	}
</style>
