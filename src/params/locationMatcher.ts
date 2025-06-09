import { csvParse, group } from 'd3';
import type { Cost, InsuranceType, DataSource, GeoLevel } from '$lib/types';
import costcsv from '$lib/data/cost.csv?raw';

// https://svelte.dev/tutorial/kit/param-matchers
export function match(geo_level: string): boolean {
	// copy pasting from layouts probably not ideal
	let costs: Cost[] = csvParse(costcsv, (d) => ({
		geo_level: d.geo_level as GeoLevel,
		id: d.id,
		insurance_type: d.insurance_type as InsuranceType,
		source: d.source as DataSource,
		year: +d.year,
		percent25: +d.percent25,
		percent50: +d.percent50,
		percent75: +d.percent75
	}));
	let locations = group(costs, (d) => d.geo_level);

	return locations.keys().some((key) => key === geo_level);
}
