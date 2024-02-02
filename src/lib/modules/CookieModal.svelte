<script>
	import Button from '$lib/ui/Button.svelte';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	$: open = false;

	function confirmCookies() {
		localStorage.setItem('agree-with-cookies', 'true');
		closeModal();
	}

	function closeModal() {
		open = false;
	}
	function showModal() {
		open = true;
	}

	function mount() {
		const isAgree = Boolean(localStorage.getItem('agree-with-cookies'));

		if (isAgree) closeModal();
		else showModal();
	}

	onMount(mount);
</script>

{#if open}
	<article class="cookie">
		<div class="wrapper">
			<p class="message">{$_('cookie')}</p>

			<div class="buttons">
				<Button
					color="gray"
					on:click={confirmCookies}>
					{$_('button.ok')}
				</Button>
			</div>
		</div>
	</article>
{/if}

<style>
	.cookie {
		font-size: 16px;
		position: absolute;
		background-color: var(--color-main);
		color: var(--color-bg-main);
		width: 30%;
		border-radius: 15px;
		padding: 1em;
		bottom: 100px;
		left: 53%;
		transform: translateX(-50%);
	}

	@media (width <= 1018px) {
		.cookie {
			width: 90%;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	.cookie .wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1em;
	}

	.cookie .message {
		font-weight: 700;
		font-size: 18px;
		margin: 0;
	}
</style>
