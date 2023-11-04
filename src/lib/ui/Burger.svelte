<script>
	import { createEventDispatcher } from 'svelte';
	import { _ } from 'svelte-i18n';

	export let isOpened = false;
	const dispatch = createEventDispatcher();

	$: dispatch('change', isOpened);
</script>

<label
	id="control-burger-menu"
	class={`menu-btn ${isOpened ? 'close' : 'open'}`}
	aria-controls="burger-menu"
	aria-expanded={isOpened}
	aria-label={$_('menu.open')}
	title={$_('menu.open')}
	{...$$restProps}
>
	<input
		class="checkbox vh"
		type="checkbox"
		bind:checked={isOpened} />
</label>

<style scoped>
	.menu-btn::before {
		content: '';
		display: flex;
		place-content: center;
		border: 0;
		margin: 0;
		padding: 0;
		height: 18px;
		width: 27px;
		line-height: 18px;
		background-color: transparent;
		background-image: var(--icon-burger-menu-open);
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		font-size: 30px;
		cursor: pointer;
	}

	.menu-btn:has(.checkbox:focus-visible)::before {
		outline: 2px solid dodgerblue;
		outline-offset: 2px;
	}

	.menu-btn_has-focus-visible::before {
		outline: 2px solid dodgerblue;
		outline-offset: 2px;
	}

	.menu-btn[aria-expanded='true']::before,
	.menu-btn:has(.checkbox:checked)::before,
	.menu-btn.close::before {
		background-image: var(--icon-burger-menu-close);
	}

	@media (width >=1018px) {
		.menu-btn {
			display: none;
		}
	}
</style>
