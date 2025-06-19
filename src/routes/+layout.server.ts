import { csvParse } from 'd3';
import type { LayoutServerLoad } from './$types';
import type { Procedure } from '$lib/types';
import labelcsv from '$lib/data/labels.csv?raw';

export const prerender = true;

export const load: LayoutServerLoad = async () => {
	let procedures: Procedure[] = csvParse(labelcsv);
	return {
		procedures
	};
};
