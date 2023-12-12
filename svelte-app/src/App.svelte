<script lang="ts">
	export let name: string;
	import { Router, Route, Link } from 'svelte-routing';
	import LoginPage from './LoginPage.svelte';
	import DetailsPage from './DetailsPage.svelte';
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<Router>
	<nav>
		<Link to="/login">Login</Link>
		<Link to="/details">Details</Link>
	</nav>
	<Route path="/login" component={LoginPage} />
	<Route path="/details" component={DetailsPage} />
</Router>