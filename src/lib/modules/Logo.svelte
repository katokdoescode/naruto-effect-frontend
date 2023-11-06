<script>
	import InlineIcon from '$lib/ui/InlineIcon.svelte';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	let frame = undefined;

	onMount(() => {
		const logoIdx = Number(localStorage.getItem('logoIdx'));
		if (logoIdx) {
			frame = logoIdx < 10 ? logoIdx + 1 : 1;
			localStorage.setItem('logoIdx', frame.toString());
		} else {
			frame = 1;
		}
	});
</script>

<a
	class="logo"
	aria-label={$_('narutoEffect')}
	href="/"
	title={$_('narutoEffect')}
>
	{#if frame}
		<InlineIcon src={`/images/logo/logo-frame-${frame}.svg`} />
	{/if}
</a>

<style scoped>
	.logo {
		display: block;
		min-width: 0;
		max-width: 279px;
		width: 100%;
		aspect-ratio: 279/64;
		font-weight: var(--font-heading-weight);
		font-size: var(--logo-font-size);
		line-height: 120%;
		position: relative;
	}

	@media (width <= 1118px) {
		.logo {
			max-width: 215px;
		}
	}

	:global(.logo svg) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	:global(.logo svg path) {
		fill: var(--color-main);
	}
</style>
