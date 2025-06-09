import { csvParse } from 'd3';
import type { Procedure } from '$lib/types';
import labelcsv from '$lib/data/labels.csv?raw';

// https://svelte.dev/tutorial/kit/param-matchers
export function match(slug: string): boolean {
	// copy pasting from layouts probably not ideal
	let procedures: Procedure[] = csvParse(labelcsv);
	return procedures.some((el) => el.slug === slug);
}
