<script>
	export let noTop = false;
	export let noBottom = false;

	$: classes = `shadow-wrapper ${noTop ? 'no-top' : ''} ${
		noBottom ? 'no-bottom' : ''
	}`;
</script>

<div class={classes}>
	<slot />
</div>

<style scoped>
	.shadow-wrapper {
		margin-top: 8px;
		padding-top: 8px;
		min-height: 0;
	}
	.shadow-wrapper,
	.shadow-wrapper.no-top {
		display: flex;
		flex-direction: column;
		position: relative;
		height: auto;
		cursor: row-resize;
	}

	.shadow-wrapper.no-top::after,
	.shadow-wrapper::before,
	.shadow-wrapper::after {
		pointer-events: none;
		content: '';
		display: block;
		position: absolute;
		width: 100%;
		height: 114px;
	}
	.shadow-wrapper::before {
		z-index: 1;
		height: 38px;
		top: -10px;
		background: linear-gradient(
			to top,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 0) 0.01%,
			var(--color-bg-main) 100%
		);
	}

	.shadow-wrapper.no-top::after,
	.shadow-wrapper::after {
		bottom: 0;
		background: linear-gradient(
			to bottom,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 0) 0.01%,
			var(--color-bg-main) 100%
		);
	}

	.shadow-wrapper.no-top::after,
	.shadow-wrapper.no-bottom::after {
		display: none;
	}
</style>
