// Data dictionary
export type GeoLevel =
	| 'USA'
	| 'AL'
	| 'AK'
	| 'AZ'
	| 'AR'
	| 'CA'
	| 'CO'
	| 'CT'
	| 'DE'
	| 'FL'
	| 'GA'
	| 'HI'
	| 'ID'
	| 'IL'
	| 'IN'
	| 'IA'
	| 'KS'
	| 'KY'
	| 'LA'
	| 'ME'
	| 'MD'
	| 'MA'
	| 'MI'
	| 'MN'
	| 'MS'
	| 'MO'
	| 'MT'
	| 'NE'
	| 'NV'
	| 'NH'
	| 'NJ'
	| 'NM'
	| 'NY'
	| 'NC'
	| 'ND'
	| 'OH'
	| 'OK'
	| 'OR'
	| 'PA'
	| 'RI'
	| 'SC'
	| 'SD'
	| 'TN'
	| 'TX'
	| 'UT'
	| 'VT'
	| 'VA'
	| 'WA'
	| 'WV'
	| 'WI'
	| 'WY';
export type InsuranceType = 'Medicare' | 'Insurance';
export type DataSource = 'CMS' | 'AHRQ' | 'BLS';

// cost.csv
export interface Cost {
	geo_level: GeoLevel;
	id: string;
	insurance_type: InsuranceType;
	source: DataSource;
	year: number;
	percent25: number;
	percent50: number;
	percent75: number;
}

// labels.csv
export interface Procedure {
	id: string;
	label: string;
	label_detailed: string;
	slug: string;
}
