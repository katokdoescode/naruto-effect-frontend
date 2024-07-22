<script>
import { BannerModes } from '$lib/constants';
import FileUploader from '$lib/modules/hokage/FileUploader.svelte';
import Input from '$lib/ui/Input.svelte';
import Textarea from '$lib/ui/Textarea.svelte';
import { _ } from 'svelte-i18n';

/** @type{string|null} */
export let link = null;

/** @type{string|null} */
export let alt = null;

/** @type{string|null} */
export let iframe = null;

/** @type{string} */
export let id = 'media-tablist-1';

/** @type {BannerModes} */
export let activeTab = 'image';

function getPanelName(name = '') {
	return `${id}-panel-${name}`;
}

const PanelNames = {
	IMAGE: getPanelName(BannerModes.IMAGE),
	VIDEO: getPanelName(BannerModes.VIDEO),
};
</script>

<div
	{id}
	class="BannerModes">
	<div
		class="options"
		aria-labelledby={id}
		role="tablist">
		<label class="option">
			<input
				id={BannerModes.IMAGE}
				name="tab"
				class="vh"
				aria-controls={PanelNames.IMAGE}
				aria-selected={this.checked}
				role="tab"
				type="radio"
				value={BannerModes.IMAGE}
				bind:group={activeTab}
			/>
			<span>{$_('tabs.options.image')}</span>
		</label>

		<label class="option">
			<input
				id={BannerModes.VIDEO}
				name="tab"
				class="vh"
				aria-controls={PanelNames.VIDEO}
				aria-selected={this.checked}
				role="tab"
				type="radio"
				value={BannerModes.VIDEO}
				bind:group={activeTab}
			/>
			<span>{$_('tabs.options.video')}</span>
		</label>
	</div>

	<fieldset class="panels">
		<div
			id={PanelNames.IMAGE}
			class="panel"
			class:hidden={activeTab !== BannerModes.IMAGE}
			aria-hidden={activeTab !== BannerModes.IMAGE}
			aria-labelledby={BannerModes.IMAGE}
			role="tabpanel"
		>
			<label for="image-link">
				<span>{$_('tabs.panel.source')}</span>
				<div class="input-with-button">
					<Input
						id="image-link"
						name="image-link"
						bordered
						round
						tabindex={activeTab !== BannerModes.IMAGE ? -1 : 0}
						type="text"
						bind:value={link}
					/>
					<FileUploader
						tabindex={activeTab !== BannerModes.IMAGE ? -1 : 0}
						bind:link
					/>
				</div>
			</label>
			<label for="image-alt">
				<span>{$_('tabs.panel.alternative')}</span>
				<div>
					<Input
						id="image-alt"
						name="image-alt"
						bordered
						round
						tabindex={activeTab !== BannerModes.IMAGE ? -1 : 0}
						type="text"
						bind:value={alt}
					/>
				</div>
			</label>
		</div>

		<div
			id={PanelNames.VIDEO}
			class="panel"
			class:hidden={activeTab !== BannerModes.VIDEO}
			aria-hidden={activeTab !== BannerModes.VIDEO}
			aria-labelledby={BannerModes.VIDEO}
			role="tabpanel"
		>
			<label for="embed-link">
				<span>{$_('tabs.panel.embed')}</span>
				<Textarea
					id="embed-link"
					bordered
					round
					tabindex={activeTab !== BannerModes.VIDEO ? -1 : 0}
					bind:value={iframe}
				/>
			</label>
		</div>
	</fieldset>
</div>

<style scoped>
	.BannerModes {
		width: 100%;
		margin: 20px 0;
		overflow: visible;
	}

	.BannerModes .options {
		display: flex;
		width: max-content;
		overflow-x: auto;
		gap: 10px;
		overflow: visible;
		margin-bottom: 10px;
	}

	.options .option {
		color: var(--color-main);
		font-size: var(--buttons-text-size);
		font-weight: normal;
	}

	.options:has(:focus-visible) {
		outline: 2px solid var(--color-main);
		outline-offset: -1px;
		border-radius: 8px;
	}

	.option input[type='radio']:checked + span {
		text-decoration: underline;
		font-weight: 700;
	}

	.panels {
		border: none;
		padding: 0;
		margin: 0;
		display: flex;
	}

	.panels .panel {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 10px;
		transition:
			display 0.1s allow-discrete,
			opacity 0.3s ease,
			transform 0.3s ease;
	}

	.panels .panel.hidden {
		position: absolute;
		display: none;
		opacity: 0;
	}

	.panel label {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 5px;
	}

	.panel label span {
		font-size: var(--labels-text-size);
		font-weight: var(--font-main-weight);
		text-transform: lowercase;
	}

	.input-with-button {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	:global(.input-with-button input) {
		flex: 4;
	}

	:global(.input-with-button div) {
		flex: 1;
		height: 100%;
	}
</style>
