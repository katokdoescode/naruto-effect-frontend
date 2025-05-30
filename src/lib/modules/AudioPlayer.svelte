<script>
import Button from '$lib/ui/Button.svelte';
import InlineIcon from '$lib/ui/InlineIcon.svelte';
import { onDestroy, onMount } from 'svelte';
import { _ } from 'svelte-i18n';

/** @type {string} */
export let id;
export let src = '';
export let show = true;

let audio;
let playing = false;
let duration = 0;
let currentTime = 0;
let volume = 1;

const audioId = `audio-${id}`;
const volumeId = `volume-${id}`;

function handleTimeUpdate() {
	currentTime = audio?.currentTime || 0;
}

function handleLoadedMetadata() {
	duration = audio?.duration || 0;
}

function onClose() {
	audio?.pause();
	playing = false;
	show = false;
}

onMount(() => {
	audio = new Audio(src);
	audio.preload = 'auto';
	audio.addEventListener('timeupdate', handleTimeUpdate);
	audio.addEventListener('loadedmetadata', handleLoadedMetadata);
});

onDestroy(() => {
	audio?.removeEventListener('timeupdate', handleTimeUpdate);
	audio?.removeEventListener('loadedmetadata', handleLoadedMetadata);
	audio = null;
});

async function togglePlay() {
	try {
		if (playing) {
			await audio.pause();
		} else {
			await audio.play();
		}
		playing = !playing;
	} catch (e) {
		console.error(e);
	}
}

/**
 * @param {number} seconds
 * @returns {string}
 */
function formatTime(seconds) {
	if (!seconds || !Number.isFinite(seconds)) return '0:00';

	let proxySeconds = Math.max(0, seconds);
	const minutes = Math.floor(proxySeconds / 60);
	const remainingSeconds = Math.floor(proxySeconds % 60);
	return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function handleSeek(e) {
	const newTime = e.target.value;
	audio.currentTime = newTime;
	currentTime = newTime;
}

function handleVolume(e) {
	volume = e.target.value;
	audio.volume = volume;
}
</script>

{#if show}
	<div class="audio-player" role="region" aria-label={$_('audioPlayer.player')}>
		<div class="controls">
			<Button
				color="black"
				nativeClasses="play-button"
				aria-controls={audioId}
				aria-label={playing ? $_('audioPlayer.pause') : $_('audioPlayer.play')}
				on:click={togglePlay}
			>
				<span class="play-text">
					{playing ? $_('audioPlayer.pause') : $_('audioPlayer.play')}
				</span>

				<InlineIcon src="/icons/play.svg" />
			</Button>

			<div class="time-slider">
				<input
					type="range"
					aria-controls={audioId}
					min="0"
					max={duration || 0}
					value={currentTime}
					on:input={handleSeek}
					aria-label={$_('audioPlayer.seek')}
				/>
				<span aria-label={$_('audioPlayer.remainingTime')}>
					{formatTime((duration || 0) - (currentTime || 0))}
				</span>
			</div>

			<div class="volume-control">
				<label for={volumeId}>
					<span class="volume-label">
						{$_('audioPlayer.volume')}:
					</span>

					<InlineIcon src="/icons/sound.svg"/>
				</label>
				<input
					id={volumeId}
					type="range"
					aria-controls={audioId}
					min="0"
					max="1"
					step="0.1"
					value={volume}
					on:input={handleVolume}
					aria-label={$_('audioPlayer.volume')}
				/>
			</div>

			<Button
				color="black"
				nativeClasses="close-button"
				aria-label={$_('close')}
				on:click={onClose}
			>
				<InlineIcon nativeClass="close-icon" src="/icons/x.svg" />
			</Button>
		</div>
	</div>
{/if}

<style>
	.audio-player {
		width: 100%;
		padding: 1rem;
		background: transparent;
		border-radius: 8px;
		box-sizing: border-box;
		container: audio-player / inline-size;
	}

	.controls {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.time-slider {
		flex: 3 1 100px;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	input[type="range"] {
		width: 100%;
		appearance: none;
		background: transparent;
	}

	input[type="range"]::-webkit-slider-runnable-track {
		width: 100%;
		height: 4px;
		background: var(--color-gray);
		border-radius: 2px;
		border: none;
	}

	input[type="range"]::-webkit-slider-thumb {
		appearance: none;
		height: 12px;
		width: 12px;
		border-radius: 50%;
		background: var(--color-main);
		cursor: pointer;
		margin-top: -4px;
	}

	input[type="range"]::-moz-range-track {
		width: 100%;
		height: 4px;
		background: var(--color-gray);
		border-radius: 2px;
		border: none;
	}

	input[type="range"]::-moz-range-thumb {
		height: 12px;
		width: 12px;
		border-radius: 50%;
		background: var(--color-main);
		cursor: pointer;
		border: none;
	}

	input[type="range"]:focus {
		outline: none;
	}

	input[type="range"]:focus::-webkit-slider-thumb {
		box-shadow: 0 0 0 2px var(--color-bg-main), 0 0 0 4px var(--color-main);
	}

	input[type="range"]:focus::-moz-range-thumb {
		box-shadow: 0 0 0 2px var(--color-bg-main), 0 0 0 4px var(--color-main);
	}

	.volume-control {
		display: flex;
		flex: 1 2;
		align-items: center;
		gap: 0.5rem;
	}

	.volume-control :global(svg) {
		display: none;
		width: 24px;
		height: 24px;
	}

	:global(.play-button svg) {
		display: none;
		width: 24px;
		height: 24px;
	}

	@media (width <= 750px) {
		.volume-control {
			flex: 1 2 100px;
		}

		.volume-label {
			clip: rect(0 0 0 0);
			clip-path: inset(50%);
			height: 1px;
			overflow: hidden;
			position: absolute;
			white-space: nowrap;
			width: 1px;
		}

		.volume-control :global(svg) {
			display: inline-block;
		}

		:global(.play-button svg) {
			display: inline-block;
		}
	}

	@container audio-player (width <= 750px) {
		.volume-control {
			flex: 1 2 100px;
		}

		.volume-label,
		.play-text {
			clip: rect(0 0 0 0);
			clip-path: inset(50%);
			height: 1px;
			overflow: hidden;
			position: absolute;
			white-space: nowrap;
			width: 1px;
		}

		.volume-control :global(svg) {
			display: inline-block;
		}

		:global(.play-button) {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		:global(.play-button svg) {
			display: inline-block;
		}
	}

	:global(.close-button) {
		width: 24px;
		height: 24px;
		padding: 0 !important;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20px;
		line-height: 1;
	}

	:global(.close-icon) {
		width: 80%;
		height: 80%;
	}
</style>
