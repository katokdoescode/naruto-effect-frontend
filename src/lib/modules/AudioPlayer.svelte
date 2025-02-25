<script>
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
	audio.pause();
	playing = false;
	show = false;
}

onMount(() => {
	audio.addEventListener('timeupdate', handleTimeUpdate);
	audio.addEventListener('loadedmetadata', handleLoadedMetadata);
});

onDestroy(() => {
	audio?.removeEventListener('timeupdate', handleTimeUpdate);
	audio?.removeEventListener('loadedmetadata', handleLoadedMetadata);
});

function togglePlay() {
	if (playing) {
		audio.pause();
	} else {
		audio.play();
	}
	playing = !playing;
}

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
		<audio
			id={audioId}
    bind:this={audio}
    {src}
    preload="metadata"
    bind:duration
    bind:currentTime
    bind:volume
  />

  <div class="controls">
    <button
      aria-controls={audioId}
      aria-label={playing ? $_('audioPlayer.pause') : $_('audioPlayer.play')}
      on:click={togglePlay}
    >
      {playing ? $_('audioPlayer.pause') : $_('audioPlayer.play')}
    </button>

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
      <label for={volumeId}>{$_('audioPlayer.volume')}:</label>
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

    <button
      class="close-button"
      aria-label={$_('close')}
      on:click={onClose}
    >
				<InlineIcon nativeClass="close-icon" src="/icons/x.svg" />
			</button>
		</div>
	</div>
{/if}

<style>
  .audio-player {
    width: 100%;
    padding: 1rem;
    background: var(--color-bg-main);
    border-radius: 8px;
		box-sizing: border-box;
		container: audio-player / inline-size;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    background: var(--color-main);
    color: var(--color-bg-main);
    border-radius: 4px;
    cursor: pointer;
  }

  .time-slider {
    flex: 3 1;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  input[type="range"] {
    width: 100%;
    -webkit-appearance: none;
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
    -webkit-appearance: none;
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
	@container audio-player (width <= 750px) {
		.volume-control {
			flex: 1 2 100px;
		}
	}

  .close-button {
    width: 24px;
    height: 24px;
    padding: 0;
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
