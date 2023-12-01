<script>
	import Button from '$lib/ui/Button.svelte';
	import { getContext } from 'svelte';
	import { _ } from 'svelte-i18n';
	const authorized = getContext('authorized');
</script>

{#if $authorized}
	<div class="edit no-desktop">
		<Button
			color="gray"
			on:click={() => alert('Редактировать!')}>
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
			<Button
				color="gray"
				on:click={() => alert('Редактировать!')}>
				{$_('button.edit')}
			</Button>
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
	}
</style>
