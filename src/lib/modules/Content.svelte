<script>
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
</script>

<Header />

<main>
	<slot />
</main>

<slot name="login" />
<Footer />
