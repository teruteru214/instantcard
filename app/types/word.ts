export interface Tag {
	id: number;
	name: string;
	isChecked: boolean;
}

export interface Word {
	word: string;
}

export interface WordData {
	translation: string;
	meaning?: string;
	pronunciation?: string;
	examples?: { text: string; translation: string }[];
	collocations?: { text: string; translation: string }[];
	frequency: number;
	derivations?: { text: string; translation: string }[];
	phrasalVerbs?: { text: string; translation: string }[];
	synonyms?: { text: string; translation: string }[];
	antonyms?: { text: string; translation: string }[];
	types?: { name: string }[];
	etymology?: string;
	note?: string;
}

export interface TextPair {
	id: number;
	text: string;
	translation: string;
}

export interface WordDetail {
	tags?: Tag[];
	word: string;
	translation: string;
	meaning?: string;
	pronunciation?: string;
	examples?: TextPair[];
	collocations?: TextPair[];
	derivations?: TextPair[];
	phrasal_verbs?: TextPair[];
	synonyms?: TextPair[];
	antonyms?: TextPair[];
	types?: number[];
	etymology?: string;
	note?: string;
	img?: string;
	input: boolean;
}
