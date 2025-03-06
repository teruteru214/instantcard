const grammarTypeMap: Record<string, string> = {
	noun: "名詞",
	verb: "動詞",
	adjective: "形容詞",
	adverb: "副詞",
	preposition: "前置詞",
	conjunction: "接続詞",
	pronoun: "代名詞",
	interjection: "間投詞",
	idiom: "慣用句",
	phrasal_verb: "句動詞",
	collocation: "コロケーション",
	set_phrase: "定型表現",
	expression: "表現",
};

export const translateGrammarType = (type: string): string => {
	return grammarTypeMap[type] || type;
};
