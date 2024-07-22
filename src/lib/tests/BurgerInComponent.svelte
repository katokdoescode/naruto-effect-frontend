<script>
import Burger from '$lib/ui/Burger.svelte';

$: isMenuOpened = false;

function updateMenuState(event) {
	const { detail } = event;
	isMenuOpened = detail;
}
</script>

<header data-menu-is-opened={isMenuOpened}>
	<Burger on:change={updateMenuState} />
</header>
