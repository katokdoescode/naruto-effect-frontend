<script>
	import InlineIcon from '$lib/ui/InlineIcon.svelte';

	export let text = '';
</script>

<div class="fant">
	<span class="fant-text">{text}</span>
	<div class="dust-wrapper show">
		<InlineIcon src="/images/hat/dust-spell.svg" />
	</div>
</div>

<style>
	.fant {
		max-width: 200px;
		min-height: 200px;
		position: relative;
		margin: 0 auto;
		display: grid;
		place-items: center;
	}

	.fant .fant-text {
		font-size: large;
		font-weight: 700;
		text-align: center;
		text-wrap: balance;
	}

	.fant .dust-wrapper {
		position: absolute;
		width: 100%;
		aspect-ratio: 1;
		top: 0;
		left: 0;
		background: radial-gradient(
			circle,
			var(--color-bg-main) 0%,
			var(--color-bg-main) 35%,
			transparent 100%
		);
		display: none;
	}

	.fant .dust-wrapper.show {
		display: block;
		animation: pop-up 0.8s ease 1 forwards;
	}
</style>
