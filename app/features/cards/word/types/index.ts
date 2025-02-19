import type { Tag } from "~/types/word";

interface TextPair {
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
	trend?: string;
	derivations?: TextPair[];
	phrasal_verbs?: TextPair[];
	synonyms?: TextPair[];
	antonyms?: TextPair[];
	types?: number[];
	other?: string;
	img?: string;
}
