import type { Tag } from "~/types/word";

interface Synonym {
	id: number;
	text: string;
	translation: string;
}

interface Antonym {
	id: number;
	text: string;
	translation: string;
}

interface Collocation {
	id: number;
	text: string;
	translation: string;
}

interface Example {
	id: number;
	text: string;
	translation: string;
}

export interface WordDetail {
	id: number;
	tags?: Tag[];
	word: string;
	translation: string;
	pronunciation?: string;
	meaning?: string;
	synonyms?: Synonym[];
	antonyms?: Antonym[];
	collocations?: Collocation[];
	examples?: Example[];
	other?: string;
	img?: string;
}
