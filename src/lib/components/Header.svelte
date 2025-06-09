<script lang="ts">
	type Props = {
		headline: string;
		description: string;
	};

	let { headline, description }: Props = $props();
</script>

<header>
	<div>
		<h1 class="serif">{headline}</h1>
		<h2>{description}</h2>
	</div>
</header>

<style>
	header {
		inline-size: 100vw;
		block-size: 320px;
		background: var(--background-color);
		padding-inline: 1rem;
		display: grid;
		place-items: end;
		padding-block-end: 2rem;
	}

	div {
		inline-size: min(100%, 1350px);
		margin-inline: auto;
	}

	h1 {
		font-size: 4.5rem;
		line-height: 1;
		letter-spacing: -0.025em;
	}

	h2 {
		font-size: 1.125rem;
		font-weight: 400;
		margin-block-start: 1rem;
	}
</style>
