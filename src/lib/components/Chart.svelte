<script lang="ts">
	import { onMount } from 'svelte';
	import { format, extent, scaleLinear, line, curveStep } from 'd3';
	import type { Cost } from '$lib/types';

	type Props = {
		data: Cost[];
	};

	let { data }: Props = $props();
	let figRef: HTMLElement;

	// sizing and margin convention
	let width = $state(350);
	let height = $state(400);
	let margins = { top: 20, left: 20, bottom: 20, right: 20 };

	// data and scales
	let currencyFormatter = format('$,.2f');
	let xAccessor = (d: Cost) => d.year;
	let yAccessor = (d: Cost) => d.percent50;
	let xScale = $derived(
		scaleLinear(extent(data, xAccessor) as [number, number], [
			0,
			width - margins.left - margins.right
		]).nice()
	);
	let yScale = $derived(
		scaleLinear(extent(data, yAccessor) as [number, number], [
			height - margins.top - margins.bottom,
			0
		]).nice()
	);
	let lineGenerator = $derived(
		line<Cost>(
			(d) => xScale(xAccessor(d)),
			(d) => yScale(yAccessor(d))
		).curve(curveStep)
	);

	// caption data
	let averagePriceChange = $derived(data[data.length - 1].percent50 - data[0].percent50);

	// resize behavior
	onMount(() => {
		let observer = new ResizeObserver((entries) => {
			entries.forEach((entry) => {
				width = entry.borderBoxSize[0].inlineSize;
			});
		});
		observer.observe(figRef);

		return () => observer.disconnect();
	});

	$inspect(data);
</script>

<div>
	<figure bind:this={figRef}>
		<svg {width} {height}>
			<title>Timeseries chart</title>
			<!-- tick lines -->
			<g style="transform: translate({0}px, {margins.top}px)">
				{#each data as cost, index}
					<line
						y1={yScale(yAccessor(cost))}
						y2={yScale(yAccessor(cost))}
						x1={margins.left}
						x2={width - margins.left}
						stroke="#F5F5F5"
					></line>
				{/each}
			</g>
			<!-- price line -->
			<g style="transform: translate({margins.left}px, {margins.top}px);">
				<path d={lineGenerator(data)} stroke-width="2px" fill="transparent" stroke="#0A3D62"></path>
			</g>
			<!-- x scale -->
			<g style="transform: translate({margins.left}px, {height}px);">
				{#each data as cost, index}
					<text
						x={xScale(xAccessor(cost))}
						style={data.length - index === 1 ? 'transform: translateX(-20px);' : ''}
						font-size="0.75rem"
						color="#0a3d62"
					>
						{cost.year}
					</text>
				{/each}
			</g>
			<!-- y scale -->
			<g style="transform: translate({0}px, {margins.top}px)">
				{#each data as cost, index}
					<text
						y={yScale(yAccessor(cost))}
						style={index === 0 ? 'transform: translateY(-5px);' : ''}
						font-size="0.75rem"
						color="#0a3d62"
					>
						{currencyFormatter(cost.percent50)}
					</text>
				{/each}
			</g>
		</svg>
		<figcaption class="sr-only">
			Chart displaying {currencyFormatter(averagePriceChange)}
			procedure price {averagePriceChange > 0 ? 'increase' : 'decrease'} from {data[0].year} to {data[
				data.length - 1
			].year}.
		</figcaption>
	</figure>
</div>

<style>
	div {
		padding-inline: 1rem;
	}
	figure {
		inline-size: min(100%, 1350px);
		margin-inline: auto;
	}
	svg {
		display: block;
	}
</style>
