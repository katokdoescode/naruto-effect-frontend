<script>
	export let noTop = false;
	export let noBottom = false;
	export let noPads = false;

	$: classes = `shadow-wrapper ${noTop ? 'no-top' : ''} ${
		noBottom ? 'no-bottom' : ''
	} ${noPads ? 'no-pads' : ''}`;
</script>

<div class={classes}>
	<slot />
</div>

<style scoped>
	.shadow-wrapper {
		--top-mask-size: 80px;
		--bottom-mask-size: 80px;
		--shadow-gradient-mask: linear-gradient(
			to bottom,
			transparent 0%,
			black var(--top-mask-size, 0),
			black calc(100% - var(--bottom-mask-size, 0)),
			transparent 100%
		);

		display: flex;

		margin-top: 8px;
		padding-top: 8px;
		min-height: 0;

		position: relative;
		height: auto;
		cursor: row-resize;

		-webkit-mask-image: var(--shadow-gradient-mask);
		mask-image: var(--shadow-gradient-mask);
	}

	.shadow-wrapper.no-top {
		--top-mask-size: 0px;
	}

	.shadow-wrapper.no-bottom {
		--bottom-mask-size: 0px;
	}

	.shadow-wrapper.no-pads {
		margin: 0;
		padding: 0;
	}
</style>
