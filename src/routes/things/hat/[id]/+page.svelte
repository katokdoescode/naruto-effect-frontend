<script>
import Fant from '$lib/modules/things/Fant.svelte';
import Hat from '$lib/modules/things/Hat.svelte';
import Button from '$lib/ui/Button.svelte';
import Textarea from '$lib/ui/Textarea.svelte';
import parseLink from '$lib/utils/parseLink';
import { onMount } from 'svelte';
import { _ } from 'svelte-i18n';

export let data;
let hatIcon;
let fantText = '';
let newFant = '';
let isAdding = false;
let isDeleting = false;
let fantInput;

$: ({ hat } = data);
$: ({ words } = hat);
$: wordsCount = words.length;
async function deleteFant(id = undefined, shouldConfirm = false) {
	if (
		id === undefined ||
		(shouldConfirm && !confirm($_('messages.confirm.hat.delete')))
	) {
		return;
	}

	isDeleting = true;
	try {
		const newWords = words.filter((_, idx) => idx !== id);
		const res = await fetch(`/api/things/hat/${hat.id}`, {
			method: 'PATCH',
			body: JSON.stringify({ words: newWords }),
		});
		const response = await res.json();
		if (!response.success) throw new Error(response.errorMessage);
		words = newWords;
		wordsCount = words.length;
	} catch (e) {
		console.error(e);
	} finally {
		isDeleting = false;
	}
}

async function getFant() {
	if (wordsCount) {
		fantText = null;
		isDeleting = true;

		const randomFantIdx = Math.floor(Math.random() * wordsCount);
		const randomFant = words[randomFantIdx];

		try {
			await deleteFant(randomFantIdx);
		} catch (e) {
			console.error(e);
		} finally {
			fantText = randomFant;
			isDeleting = false;
		}
	}
}

async function putFant() {
	if (!newFant && !hat?.isPutting) return;
	isAdding = true;
	try {
		const res = await hatIcon.putItem(() => {
			return fetch(`/api/things/hat/${hat.id}`, {
				method: 'PATCH',
				body: JSON.stringify({ words: [...words, newFant] }),
			});
		});
		const response = await res.json();
		if (!response.success) throw new Error(response.errorMessage);

		words = response.data.words;
		wordsCount = words.length;
		newFant = '';
		if (fantInput) {
			fantInput.clearValue();
			fantInput.updateHeight();
		}
	} catch (e) {
		console.error(e);
	} finally {
		isAdding = false;
	}
}

async function startGame() {
	if (!confirm($_('messages.confirm.hat.start'))) return;

	try {
		const res = await fetch(`/api/things/hat/${hat.id}`, {
			method: 'PATCH',
			body: JSON.stringify({ isPutting: false }),
		});

		const response = await res.json();

		if (!response.success) throw new Error(response.errorMessage);
		hat.isPutting = false;
	} catch (e) {
		console.error(e);
	}
}

onMount(async () => {
	if (hat.password) {
		const userPass = prompt($_('messages.prompt.hat.password'));
		if (userPass !== hat.password) {
			window.location.assign('/things/hat');
			return;
		}
	}
});
</script>

<svelte:head>
	<title>{$_('things.hat.head.single.title')} {hat.name}</title>
	<meta
		name="description"
		content={$_('things.hat.head.single.description')} />
</svelte:head>

<a href="/things/hat">← {$_('button.things.hat.back')}</a>
{#if hat}
	<h1>{hat.name}</h1>

	{#if hat?.isPutting}
		<form
			name="hat"
			class="fant-form"
			on:submit|preventDefault>
			<Textarea
				bind:this={fantInput}
				id="fant-name"
				bordered={true}
				placeholder={$_('placeholder.things.hat.inputName')}
				resize="vertical"
				round={true}
				bind:value={newFant}
			/>

			<Button
				id="fant-submit"
				bordered={true}
				color="black"
				disabled={isAdding}
				round={true}
				type="submit"
				on:click={putFant}
			>
				{$_('button.things.hat.put')}
			</Button>
		</form>

		<details class="fant-details">
			<summary>{$_('button.things.hat.showList')} | {wordsCount} 🎟️</summary>

			<ul class="fant-list">
				{#each words as word, idx}
					<li class="fant-item">
						{#if parseLink(word)}
							<a
								href={word}
								rel="noopener noreferrer"
								target="_blank"
							>{word}</a>
						{:else}
							{word}
						{/if}
						<Button
							color="red"
							on:click={() => deleteFant(idx, true)}>🚮</Button>
					</li>
				{/each}
			</ul>
		</details>

		<Button
			color="black"
			on:click={startGame}>
			{$_('button.things.hat.start')}
		</Button>
	{/if}

	<Hat
		bind:this={hatIcon}
		disabled={isDeleting || !wordsCount}
		{wordsCount}
		on:click={getFant}
	/>

	{#if fantText}
		<Fant text={fantText} />
	{:else}
		<div class="empty-fant"></div>
	{/if}
{/if}
<style>
	.fant-form {
		margin-top: 1rem;
		display: flex;
		gap: 1rem;
	}

	.fant-list {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		padding-left: 0;
	}

	.fant-item {
		display: flex;
		gap: 0.5rem;
		justify-content: space-between;
		word-break: break-all;
	}

	.fant-details summary {
		font-weight: 700;
		margin-top: 0.3rem;
		padding-top: 0.5lh;
		padding-bottom: 0.5lh;
		cursor: pointer;
	}

	.empty-fant {
		min-height: 200px;
	}
</style>
