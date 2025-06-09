<script lang="ts">
	import { page } from '$app/state';
	import Select from './Select.svelte';
	import type { ChangeEventHandler } from 'svelte/elements';

	type Props = {
		selectionOptions: any[];
		selectCallback: ChangeEventHandler<HTMLSelectElement>;
	};

	let { selectionOptions, selectCallback }: Props = $props();
</script>

<div class="sticky">
	<nav>
		<div class="content">
			<span class="title serif">Medical Costs</span>
			<span class="description">Lorem ipsum dolor sit amet</span>
		</div>
		<div>
			<Select
				label="Select a location"
				{selectionOptions}
				{selectCallback}
				selectedMatcher={page.params.locations}
				id="location-select"
			/>
		</div>
	</nav>
</div>

<style>
	.sticky {
		position: sticky;
		top: 0;
		left: 0;
		inline-size: 100vw;
		block-size: 64px;
		padding-inline: 1rem;
		border-block-end: 1px solid var(--border-color);
		display: flex;
		justify-content: center;
		align-items: center;
		background: #fff;
	}

	nav {
		display: flex;
		justify-content: space-between;
		inline-size: min(100%, 1350px);
	}

	span {
		display: block;
		line-height: 1;
		color: var(--main-text-color);
	}

	.title {
		font-size: 1.125rem;
	}

	.description {
		margin-block-start: 0.25rem;
		font-size: 0.75rem;
	}
</style>
