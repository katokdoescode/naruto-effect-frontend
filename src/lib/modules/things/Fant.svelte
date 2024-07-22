<script>
import InlineIcon from '$lib/ui/InlineIcon.svelte';

export let text = '';
$: text = text.trim();
$: isLong = text.length > 20;
</script>

<div
	class="fant"
	class:long={isLong}>
	<p class="fant-text">{text}</p>
	<div class="dust-wrapper show">
		<InlineIcon src="/images/hat/dust-spell.svg" />
	</div>
</div>

<style>
	.fant {
		width: 100%;
		min-height: 200px;
		position: relative;
		margin: 0 auto;
		display: grid;
		place-items: center;
		box-sizing: border-box;
	}

	.fant .fant-text {
		font-size: large;
		font-weight: 700;
		text-align: center;
		text-wrap: balance;
	}

	.fant.long .fant-text {
		white-space: pre-wrap;
		font-weight: normal;
		text-align: start;
	}

	.fant .dust-wrapper {
		position: absolute;
		width: 200px;
		aspect-ratio: 1;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: none;
	}

	.fant .dust-wrapper.show {
		display: block;
	}

	.fant .dust-wrapper.show :global(svg) {
		background: radial-gradient(
			circle,
			var(--color-bg-main) 0%,
			var(--color-bg-main) 35%,
			transparent 100%
		);
		animation: pop-up 0.8s ease 1 forwards;
	}
</style>
