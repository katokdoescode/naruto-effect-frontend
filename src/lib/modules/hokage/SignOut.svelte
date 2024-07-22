<script>
import { enhance } from '$app/forms';
import Button from '$lib/ui/Button.svelte';
import { createEventDispatcher } from 'svelte';
import { _ } from 'svelte-i18n';

/**@type{string}*/
export let nativeClass = '';

const dispatch = createEventDispatcher();

async function signOut() {
	return async ({ result }) => {
		if (result.success) {
			dispatch('logout');
		}
	};
}
</script>

<div class={'signout ' + nativeClass}>
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

<style scoped>
	.signout {
		display: grid;
		grid-template-columns: repeat(2, max-content);
		gap: 21px;
		place-items: baseline;
	}
</style>
