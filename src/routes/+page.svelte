<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let { procedures } = $derived(data);
</script>

<main>
	<ul role="list">
		{#each procedures as { slug, label }}
			<li><a href="/{slug}">{label}</a></li>
		{/each}
	</ul>
</main>

<style>
	main {
		min-block-size: 100svh;
		padding: 1rem;
	}

	ul {
		list-style: none;
		padding: 0;
	}
</style>
