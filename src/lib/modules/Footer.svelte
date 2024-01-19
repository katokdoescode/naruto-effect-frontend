<script>
	import Button from '$lib/ui/Button.svelte';
	import { createEventDispatcher, getContext } from 'svelte';
	import { _ } from 'svelte-i18n';
	const dispatch = createEventDispatcher();

	const isFooterEditorOpen = getContext('isFooterEditorOpen');
	const footerEditorState = getContext('footerEditorState');
	const authorized = getContext('authorized');

	function showFooterEditor() {
		isFooterEditorOpen.set(true);
	}

	function hideFooterEditor() {
		isFooterEditorOpen.set(false);
	}

	function submitFooterForm() {
		dispatch('submitFooter');
	}
</script>

{#if $authorized}
	<div class="edit no-desktop">
		<Button
			color="gray"
			on:click={showFooterEditor}>
			{$_('button.edit')}
		</Button>
	</div>
{/if}
<footer class="copyright">
	<span class="year">2023</span>
	<span class="disclaimer">
		{$_('copyright')}
	</span>

	{#if $authorized}
		<div class="edit no-mobile">
			{#if $isFooterEditorOpen}
				<Button
					color="gray"
					on:click={submitFooterForm}>
					{$_(`button.${$footerEditorState}`)}
				</Button>
				<Button
					color="red"
					on:click={hideFooterEditor}>
					{$_('button.cancel')}
				</Button>
			{:else}
				<Button
					color="gray"
					on:click={showFooterEditor}>
					{$_('button.edit')}
				</Button>
			{/if}
		</div>
	{/if}
</footer>

<style scoped>
	.copyright {
		display: flex;
		place-items: center;
		position: relative;
		gap: 30px;
		color: #949494;
		height: 94px;
		margin-top: auto;
	}

	.copyright .year {
		font-size: var(--year-font-size);
	}

	.copyright .disclaimer {
		font-size: var(--copyright-font-size);
	}

	.copyright .edit {
		align-self: center;
		display: flex;
		gap: 1em;
		flex-direction: column;
	}
</style>
