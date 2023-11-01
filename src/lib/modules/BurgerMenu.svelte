<script>
	import { _, locale } from 'svelte-i18n';
	import LangSwitch from './LangSwitch.svelte';
	import ThemeSwitch from './ThemeSwitch.svelte';
	let lang;

	locale.subscribe((l) => (lang = l));

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
						{name[lang]}
					</a>
				</li>
			{/each}
		</ul>
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
</style>
