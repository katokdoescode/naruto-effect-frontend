<script>
	import InlineIcon from '$lib/ui/InlineIcon.svelte';
	import { _ } from 'svelte-i18n';
	const frames = Array.from({ length: 10 }, (_, index) => index + 1);
</script>

<a
	class="logo"
	aria-label={$_('narutoEffect')}
	href="/"
	title={$_('narutoEffect')}
>
	{#each frames as frame}
		<InlineIcon src={`/images/logo/logo-frame-${frame}.svg`} />
	{/each}
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
		--animation-cycle-duration: 4s; /* Общая продолжительность цикла анимации для всех SVG */
		--number-of-images: 10; /* Количество SVG изображений */
		--single-view-duration: calc(
			var(--animation-cycle-duration) / var(--number-of-images)
		); /* Время показа одного изображения */
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
		opacity: 0;
		animation-name: slideShow;
		animation-timing-function: ease-in;
		animation-duration: var(--animation-cycle-duration);
		animation-iteration-count: infinite;
		animation-delay: calc((var(--index) - 1) * var(--single-view-duration));
	}

	:global(.logo svg path) {
		fill: var(--color-main);
	}

	@media (prefers-reduced-motion) {
		:global(.logo svg) {
			animation: none;
			display: none;
			visibility: hidden;
		}

		:global(.logo svg:first-child) {
			display: block;
			visibility: visible;
			opacity: 1;
		}
	}

	@keyframes slideShow {
		0%,
		20%,
		100% {
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
	}

	:global(.logo svg:nth-child(1)) {
		--index: 1;
	}
	:global(.logo svg:nth-child(2)) {
		--index: 2;
	}
	:global(.logo svg:nth-child(3)) {
		--index: 3;
	}
	:global(.logo svg:nth-child(4)) {
		--index: 4;
	}
	:global(.logo svg:nth-child(5)) {
		--index: 5;
	}
	:global(.logo svg:nth-child(6)) {
		--index: 6;
	}
	:global(.logo svg:nth-child(7)) {
		--index: 7;
	}
	:global(.logo svg:nth-child(8)) {
		--index: 8;
	}
	:global(.logo svg:nth-child(9)) {
		--index: 9;
	}
	:global(.logo svg:nth-child(10)) {
		--index: 10;
	}
</style>
