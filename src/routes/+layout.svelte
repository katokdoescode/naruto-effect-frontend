<script>
	import Content from '$lib/modules/Content.svelte';
	import Login from '$lib/modules/Login.svelte';
	import MainPanel from '$lib/modules/MainPanel.svelte';
	import MobileHeader from '$lib/modules/MobileHeader.svelte';
	import SecondaryPanel from '$lib/modules/SecondaryPanel.svelte';
	import { handleKeydown, handleKeyup } from '$lib/utils/keyboardHandler';
	import { onDestroy, onMount, setContext } from 'svelte';
	import { locale } from 'svelte-i18n';
	import { writable } from 'svelte/store';

	/** @type {MainLayoutData} */
	export let data;

	const combo = writable();
	const authorized = writable();
	const isEditingState = writable();
	const contentPageStatus = writable();
	const contentPage = writable();
	const practiceData = writable();
	const participantData = writable();

	let practices = data?.practices || [];
	let participants = data?.participants || [];
	let socialLinks = data?.pageData?.socialLinks || [];
	let participateLink = data?.pageData?.participateLink || [];

	/**
	 * Control authorization data
	 * @param {boolean} state
	 */
	async function authorize(state) {
		authorized.set(state);

		if (state) closeLoginModal();
		else isEditingState.set(false);

		await fetch('/api/practices')
			.then((res) => res.json())
			.then(({ data }) => {
				practices = data;
			});

		await fetch('/api/participants')
			.then((res) => res.json())
			.then(({ data }) => {
				participants = data;
			});
	}

	/**
	 * Update data in page data array
	 * @param {CustomEvent&{detail: {method: string, data: Participant|Practice}}} update
	 */
	function updateData(update) {
		const { method, data } = update.detail;

		const methods = {
			/** @param {Practice} data */
			updatePractices: function (data) {
				practices = practices.map((practice) =>
					practice.id === data.id ? data : practice
				);
			},
			/** @param {Participant} data */
			updateParticipants: function (data) {
				participants = participants.map((participant) =>
					participant.id === data.id ? data : participant
				);
			}
		};

		methods[method](data);
	}

	function closeLoginModal() {
		combo.set(false);
		open = false;
	}

	function logoController() {
		const idx = localStorage.getItem('logoIdx');
		const logoIdx = idx ? Number(idx) : 0;
		const newIdx = logoIdx < 10 ? logoIdx + 1 : 1;
		localStorage.setItem('logoIdx', newIdx.toString());
	}

	function initHandlers() {
		window.addEventListener('keydown', (e) => combo.set(handleKeydown(e)));
		window.addEventListener('keyup', handleKeyup);
	}

	function destroyHandlers() {
		window.removeEventListener('keydown', handleKeydown);
		window.removeEventListener('keyup', handleKeyup);
	}

	onMount(() => {
		const settedLocale = localStorage.getItem('userLang');
		if (settedLocale) locale.set(settedLocale);

		locale.subscribe((lang) => {
			document.querySelector('html').lang = lang;
			localStorage.setItem('userLang', lang);
		});

		initHandlers();
		logoController();
	});

	onDestroy(() => {
		destroyHandlers;
	});

	setContext('authorized', authorized);
	setContext('combo', combo);
	setContext('isEditingState', isEditingState);
	setContext('contentPageStatus', contentPageStatus);
	setContext('contentPage', contentPage);
	setContext('practiceData', practiceData);
	setContext('participantData', participantData);

	$: if ($combo) {
		open = true;
	}
	$: open = false;
	$: authorized.set(data?.authorized || false);
</script>

<svelte:head>
	{#if $authorized}
		<script src="/scripts/tinymce/tinymce.min.js"></script>
	{/if}
</svelte:head>

<div class="screen main-layout">
	<MainPanel
		{practices}
		{socialLinks} />

	<MobileHeader
		{participants}
		{participateLink}
		{practices}
		{socialLinks} />

	<Content
		on:update={updateData}
		on:logout={() => authorize(false)}>
		<slot />
		<svelte:fragment slot="login">
			<Login
				bind:open
				on:success={() => authorize(true)}
				on:close={closeLoginModal}
			/>
		</svelte:fragment>
	</Content>

	<SecondaryPanel
		{participants}
		{participateLink} />
</div>

<style>
	.main-layout {
		container: main / inline-size;
		display: flex;
		height: calc(100svh - var(--initial-padding-top));
		justify-content: space-between;
		padding: var(--body-padding);
		max-width: var(--max-content-width);
		margin: 0 auto;
		column-gap: var(--sections-padding);
	}

	@media (width <= 1018px) {
		.main-layout {
			height: auto;
			flex-direction: column;
			justify-content: start;
			align-items: stretch;
		}
	}

	@media (width <= 1018px) {
		:global(.main-layout .panel) {
			flex: 1 0 auto;
			width: 100%;
			padding: 0;
			max-width: unset;
			min-width: unset;
			overflow: auto;
		}
	}
</style>
