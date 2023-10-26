<script>
	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {object} */
	const { user } = data;
</script>

<h1>Hello, {user.name}</h1>
