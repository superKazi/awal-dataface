import { csvParse } from 'd3';
import type { LayoutServerLoad } from './$types';
import type { Cost, InsuranceType, DataSource, GeoLevel } from '$lib/types';
import costcsv from '$lib/data/cost.csv?raw';

export const load: LayoutServerLoad = async ({ params }) => {
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

	let locations = [...new Set(costs.map((cost) => cost.geo_level))];
	let appLocations = params.locations;

	let locationCosts = costs.filter((cost) => {
		if (params.locations) {
			return cost.geo_level === appLocations;
		} else {
			return cost.geo_level === 'USA';
		}
	});

	return {
		locations,
		locationCosts
	};
};
