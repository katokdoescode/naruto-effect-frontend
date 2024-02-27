<script>
	import { page } from '$app/stores';
</script>

<h1>Oops... {$page.status}</h1>
<br />
<article class="error">
	<p>
		<strong>Error message:</strong>
	</p>
	<p>
		<code>{$page.error.message}</code>
	</p>
</article>
