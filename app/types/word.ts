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
