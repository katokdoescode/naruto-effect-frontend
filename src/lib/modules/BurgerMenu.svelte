<script>
	import { createEventDispatcher, getContext } from 'svelte';
	import { _, locale } from 'svelte-i18n';
	import LangSwitch from './LangSwitch.svelte';
	import ThemeSwitch from './ThemeSwitch.svelte';
	import SignOut from './hokage/SignOut.svelte';

	const dispatch = createEventDispatcher();
	const authorized = getContext('authorized');

	/** @type{SocialLinkLocale[]} */
	export let socialLinks = null;

	/** @type {string} */
	export let participateLink = null;
</script>

<div
	id="burger-menu"
	class="burger-menu"
	{...$$props}>
	{#if socialLinks}
		<ul class="links-list">
			{#each socialLinks as { link, name }}
				<li>
					<a
						href={link}
						referrerpolicy="no-referrer"
						rel="me"
						target="_blank">
						{name[$locale]}
					</a>
				</li>
			{/each}
		</ul>
	{/if}

	{#if $authorized}
		<div class="burger-logout">
			<SignOut
				nativeClass="wide"
				on:logout={() => dispatch('logout')} />
		</div>
	{/if}

	<ul class="links-list horizontal">
		<li>
			<a href={participateLink}>
				{$_('participate')}
			</a>
		</li>
		<li><ThemeSwitch /></li>
		<li><LangSwitch id="burger-menu-lang-switch" /></li>
	</ul>
</div>

<style scoped>
	.burger-menu {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.burger-menu .links-list {
		width: 100%;
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: flex-start;
		color: var(--main-color);
		font-size: var(--font-main-menu-size);
		font-weight: var(--font-menu-weight);
		row-gap: 16px;
	}

	.burger-menu .links-list:not(.horizontal) {
		position: absolute;
		top: 40%;
		transform: translateY(-50%);
	}

	.burger-menu .links-list.horizontal {
		position: absolute;
		bottom: var(--initial-padding-top);
		flex-direction: row;
		justify-content: space-between;
	}

	.burger-logout {
		width: 100%;
		position: absolute;
		top: 65%;
		transform: translateY(-50%);
	}

	.burger-logout :global(.wide) {
		display: flex;
		justify-content: space-between;
	}
</style>
