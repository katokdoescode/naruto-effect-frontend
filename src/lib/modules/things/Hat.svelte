<script>
import InlineIcon from '$lib/ui/InlineIcon.svelte';
import { createEventDispatcher } from 'svelte';
import { _ } from 'svelte-i18n';

export let wordsCount = 0;
export let showStars = false;
export let showItemPutting = false;
export let disabled = false;

const dispatch = createEventDispatcher();
export async function putItem(callback) {
	showItemPutting = true;
	try {
		setTimeout(() => {
			showStars = true;
		}, 300);
		return callback && (await callback());
	} finally {
		setTimeout(() => {
			showItemPutting = false;
			showStars = false;
		}, 2000);
	}
}

function click() {
	showStars = true;

	dispatch('click');

	setTimeout(() => {
		showStars = false;
	}, 3000);
}
</script>

<div class="hat-component">
	<figure class="hat">
		<div class="filler">
			{#if showStars}
				<InlineIcon
					nativeClass="star-dust play"
					src="/images/hat/star-dust.svg"
				/>
			{/if}

			{#if showItemPutting}
				<InlineIcon
					nativeClass="flower play"
					src="/images/hat/letter.svg" />
			{/if}
		</div>

		<div class="hat-wrapper">
			<InlineIcon
				nativeClass="hat-icon"
				src="/images/hat/hat.svg" />
			<caption class="words-count">{wordsCount}</caption>
		</div>
	</figure>

	<button
		class="hat-button"
		aria-label={$_('button.things.hat.get')}
		{disabled}
		type="button"
		on:click={click}
	></button>
</div>

<style>
	.hat-component {
		position: relative;
	}

	.hat-button {
		position: absolute;
		display: block;
		top: 1rem;
		left: 1rem;
		right: 1rem;
		bottom: 1rem;
		border: none;
		border-radius: 1rem;
		background: transparent;
		cursor: pointer;
	}

	.hat {
		max-width: 300px;
		display: grid;
		grid-template-rows: 100px 1fr;
		place-items: center;
		margin: 0 auto;
		overflow: visible;
	}

	.hat-wrapper {
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;
		position: relative;
	}

	.hat-wrapper .words-count {
		display: block;
		position: absolute;
		font-size: 2em;
		font-weight: 700;
		top: 55%;
		max-width: 100px;
		word-break: break-all;
	}

	:global(.hat-icon) {
		transform: rotate(180deg);
	}

	:global(.star-dust) {
		position: absolute;
	}

	:global(.flower) {
		max-width: 50px;
		transform: translate(-175px, -70px);
		position: absolute;
	}

	:global(.flower.play) {
		animation: putting 2s ease 1 forwards;
	}

	.filler {
		width: 100%;
		height: 100%;
		display: grid;
		place-items: center;
		position: relative;
	}
</style>
