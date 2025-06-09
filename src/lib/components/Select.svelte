<script lang="ts">
	import type { ChangeEventHandler } from 'svelte/elements';

	type Props = {
		selectionOptions: any[];
		selectCallback: ChangeEventHandler<HTMLSelectElement>;
		id: string;
		label: string;
		selectedMatcher: string | undefined | false;
	};

	// selectedMatcher probably not ideal pattern
	let { selectionOptions, selectCallback, id, label, selectedMatcher }: Props = $props();
</script>

<label for={id} class="sr-only">{label}</label>
<select name="locations" {id} class="serif" onchange={selectCallback}>
	{#each selectionOptions as opt}
		<option value={opt} selected={opt === selectedMatcher ? true : false}>
			{opt}
		</option>
	{/each}
</select>

<style>
	label {
		font-size: 0.75rem;
		color: var(--main-text-color);
	}
	select {
		font-size: 1rem;
		color: var(--main-text-color);
	}
</style>
