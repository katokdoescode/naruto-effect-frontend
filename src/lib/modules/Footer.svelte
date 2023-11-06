<script>
	import { _ } from 'svelte-i18n';
</script>

<footer class="copyright">
	<span class="year">2023</span>
	<span class="disclaimer">{$_('copyright')}</span>
</footer>

<style scoped>
	.copyright {
		display: flex;
		place-items: center;
		position: relative;
		gap: 30px;
		color: #949494;
		height: 94px;
	}

	.copyright .year {
		font-size: var(--year-font-size);
	}

	.copyright .disclaimer {
		font-size: var(--copyright-font-size);
	}
</style>
