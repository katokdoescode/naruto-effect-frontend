<script>
	import { _ } from 'svelte-i18n';
</script>

<footer class="copyright">
	<span class="year">2023</span>
	<span class="disclaimer">{$_('copyright')}</span>
</footer>

<style scoped>
	.copyright {
		background-color: rgba(250, 150, 100, 0.2);
		display: flex;
		place-items: center;
		position: relative;
		gap: 30px;
		color: #949494;
		height: 94px;
	}

	@media (width >= 1018px) {
		/* SHADOW */
		.copyright::before {
			content: '';
			position: absolute;
			top: -114px;
			display: block;
			width: 100%;
			height: 114px;
			background: linear-gradient(
				to bottom,
				rgba(255, 255, 255, 0) 0%,
				rgba(255, 255, 255, 0) 0.01%,
				var(--color-bg-main) 100%
			);
		}
	}

	.copyright .year {
		font-size: var(--year-font-size);
	}

	.copyright .disclaimer {
		font-size: var(--copyright-font-size);
	}
</style>
