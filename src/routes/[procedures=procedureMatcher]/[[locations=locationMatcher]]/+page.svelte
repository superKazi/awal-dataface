<script lang="ts">
	import { page } from '$app/state';
	import { group } from 'd3';
	import Header from '$lib/components/Header.svelte';
	import Select from '$lib/components/Select.svelte';
	import type { PageProps } from './$types';
	import type { ChangeEventHandler } from 'svelte/elements';
	import type { DataSource, InsuranceType } from '$lib/types';
	import Chart from '$lib/components/Chart.svelte';

	let { data }: PageProps = $props();
	let { procedures, locationCosts } = $derived(data);
	let headerData = $derived(
		procedures.find((procedure) => procedure.slug === page.params.procedures)
	);

	// simple early return for data validation
	$effect(() => {
		if (!headerData) {
			console.error({ data, procedures, locationCosts, headerData });
		}
	});

	// data transforms
	let procedureId = $derived(
		procedures.find((procedure) => procedure.slug === page.params.procedures)?.id
	);

	let insuranceGroups = $derived(
		group(
			locationCosts,
			(d) => d.insurance_type,
			(d) => d.source,
			(d) => d.id
		)
	);

	// super hairy logic, probably should break out into functions to make it simpler to follow. too many hasty ternaries to handle initial state of data on pageload v state upon interaction
	let insuranceTypes = $derived(insuranceGroups.keys().toArray());
	let initialInsurance = $derived(insuranceTypes[0]);

	let selectedInsurance: false | InsuranceType = $state(false);
	let selectedDataSource: false | DataSource = $state(false);

	let dataSources = $derived(
		insuranceGroups
			.get(selectedInsurance ? selectedInsurance : initialInsurance)
			?.keys()
			.toArray()
			.flat(Infinity)
	);
	let numDataSources = $derived(dataSources?.length ?? 1);
	let intialDataSource = $derived(
		insuranceGroups
			.get(selectedInsurance ? selectedInsurance : initialInsurance)
			?.keys()
			.toArray()[0]
	);

	let componentData = $derived(
		intialDataSource &&
			procedureId &&
			insuranceGroups
				.get(selectedInsurance ? selectedInsurance : initialInsurance)
				?.get(selectedDataSource ? selectedDataSource : intialDataSource)
				?.get(procedureId)
	);

	// user selection callbacks
	let selectInsuranceCallback: ChangeEventHandler<HTMLSelectElement> = (e): void => {
		selectedInsurance = e.currentTarget.value as InsuranceType;

		// this is brute force state resetting. if someone selects an insurance data source and then selects medicare again, the app looks for medicare with the datasource from insurance and says there's no data. this resets the data source back to the first data source available to medicare. there are definitely more elegant ways to set up the page state.
		if (selectedDataSource) {
			if (typeof insuranceGroups.get(selectedInsurance)?.get(selectedDataSource) === 'undefined') {
				selectedDataSource = insuranceGroups
					.get(selectedInsurance ? selectedInsurance : initialInsurance)
					?.keys()
					.toArray()[0] as DataSource;
			}
		}
	};
	let selectDatasourceCallback: ChangeEventHandler<HTMLSelectElement> = (e): void => {
		selectedDataSource = e.currentTarget.value as DataSource;
	};
</script>

<main>
	{#if headerData}
		<Header headline={headerData.label} description={headerData.label_detailed} />
		<div class="container">
			<div class="group">
				<Select
					selectionOptions={insuranceTypes}
					selectCallback={selectInsuranceCallback}
					id="insurance-type-select"
					label="Select insurance"
					selectedMatcher={selectedInsurance ? selectedInsurance : initialInsurance}
				/>
				{#if dataSources && numDataSources > 1}
					<Select
						selectionOptions={dataSources}
						selectCallback={selectDatasourceCallback}
						id="data-source-select"
						label="Select insurance data source"
						selectedMatcher={selectedDataSource ? selectedDataSource : intialDataSource}
					/>
				{/if}
			</div>
		</div>
		{#if componentData}
			<Chart data={componentData} />
		{:else}
			<div class="group">
				<h2>Sorry, there is no data for this procedure in {page.params.locations}.</h2>
			</div>
		{/if}
	{:else}
		<div class="group"><h2>Sorry, there was an issue, please try again later.</h2></div>
	{/if}
</main>

<style>
	.container {
		padding-inline: 1rem;
	}
	.group {
		inline-size: min(100%, 1350px);
		margin-inline: auto;
		margin-block-start: 4rem;
	}
</style>
