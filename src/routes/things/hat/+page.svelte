<script>
import Button from '$lib/ui/Button.svelte';
import Input from '$lib/ui/Input.svelte';
import { getDateFormatter, locale } from 'svelte-i18n';
import { _ } from 'svelte-i18n';

/**
 * @type {import('./$types').PageData}
 */
export let data = undefined;

/** @type {HatData[]}*/
let hats = data?.hats || [];
let isLoading = false;
let isDeleting = null;
let error = null;

/** @type {HatData}*/
let newHat = {
	name: '',
	password: null,
	words: [],
};

async function createNewHat() {
	isLoading = true;
	if (!newHat.name) return;

	try {
		const res = await fetch('/api/things/hat', {
			method: 'POST',
			body: JSON.stringify(newHat),
		});
		const response = await res.json();
		if (!response.success) throw new Error(response.errorMessage);

		newHat = {
			name: '',
			password: null,
			words: [],
		};

		data.hats.push(response.data);
		hats = data.hats;
	} catch (e) {
		error = e;
		console.error(e);
	} finally {
		isLoading = false;
	}
}

async function removeHat(id) {
	if (!id || !confirm($_('messages.confirm.hat.delete'))) return;

	isDeleting = id;
	try {
		await fetch(`/api/things/hat/${id}`, {
			method: 'DELETE',
		});
		data.hats = hats.filter((hat) => hat.id !== id);
		hats = data.hats;
	} catch {
		console.error('Failed to delete hat');
		alert($_('messages.error.hat.delete'));
	} finally {
		isDeleting = null;
	}
}

function getDate(date) {
	if (!date) return '';

	try {
		const proxyDate = new Date(date);
		return getDateFormatter({ locale: $locale }).format(proxyDate);
	} catch {
		return date;
	}
}
</script>

<svelte:head>
	<title>{$_('things.hat.head.title')}</title>
	<meta
		name="description"
		content={$_('things.hat.head.description')} />
</svelte:head>
<h1>{$_('things.hat.title')}</h1>
<ul class="col">
	{#each hats as hat}
		<li
			class="row"
			class:deleting={hat.id === isDeleting}>
			<a href="/things/hat/{hat.id}">{hat.name} | {getDate(hat?.createdAt)}</a>
			<Button
				aria-label={$_('button.things.hat.delete')}
				color="red"
				on:click={() => removeHat(hat.id)}>🎩🔫</Button
			>
		</li>
	{/each}
</ul>
{#if !hats.length}
	<p>{$_('messages.things.hat.noHats')}</p>
{/if}
<form
	class="new-hat"
	on:submit|preventDefault={createNewHat}>
	<fieldset>
		<legend>{$_('things.hat.create')}</legend>
		<div class="wrapper">
			<div class="inputs">
				<Input
					id="hat-name"
					bordered
					disabled={isLoading}
					placeholder={$_('placeholder.things.hat.name')}
					required
					round
					bind:value={newHat.name}
				/>
				<Input
					id="hat-password"
					bordered
					disabled={isLoading}
					placeholder={$_('placeholder.things.hat.password')}
					round
					bind:value={newHat.password}
				/>
			</div>

			<Button
				color="black"
				type="submit"
			>{$_('button.things.hat.create')}</Button
			>
		</div>

		{#if error}
			<span class="error">{error || ''}</span>
		{/if}

		{#if isLoading}
			<div class="loading">Loading...</div>
		{/if}
	</fieldset>
</form>

<style>
	.new-hat {
		margin-top: 3rem;
	}
	.new-hat fieldset {
		border-radius: 0.5rem;
		border-width: 4px;
		position: relative;
	}

	.new-hat .loading {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: var(--color-bg-main);
		display: grid;
		place-items: center;
		pointer-events: none;
	}

	.new-hat fieldset:has(.error) {
		border-color: var(--color-red);
	}

	.new-hat legend {
		font-weight: 700;
	}

	.new-hat .wrapper {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		align-content: center;
		margin-bottom: 0.3rem;
	}

	.new-hat .inputs {
		flex: 1 1 auto;
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.new-hat .inputs :global(.input) {
		flex: 1 1 100px;
	}

	.new-hat :global(.button) {
		min-height: 100%;
		align-self: unset;
		flex-grow: 1;
	}

	.new-hat .error {
		background-color: var(--color-red);
		padding: 0.1rem 0.2rem;
		border-radius: 0.2rem;
	}

	.col {
		padding-left: 0;
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.row {
		display: flex;
		justify-content: space-between;
		list-style: none;
		gap: 1rem;
		margin: 0;
		border-bottom-width: 2px;
		border-bottom-style: solid;
		padding: 0.3rem;
		align-items: center;
	}

	.row.deleting {
		opacity: 0.5;
		pointer-events: none;
	}
</style>
