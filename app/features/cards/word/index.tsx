import WordForm from "./components/WordForm";
import type { WordDetail } from "./types";

const mockData: WordDetail = {
	tags: [
		{ id: 1, name: "果物", check: true },
		{ id: 2, name: "食べ物", check: false },
	],
	word: "apple",
	translation: "リンゴ",
	meaning: "リンゴの果実。木から成る果物の一種。",
	pronunciation: "ˈæp.l̩",
	examples: [
		{ id: 1, text: "She ate an apple.", translation: "彼女はリンゴを食べた。" },
		{
			id: 2,
			text: "An apple a day keeps the doctor away.",
			translation: "1日1個のリンゴは医者を遠ざける。",
		},
	],
	collocations: [
		{ id: 1, text: "eat an apple", translation: "リンゴを食べる" },
		{ id: 2, text: "apple pie", translation: "アップルパイ" },
	],
	trend: "TOEICの出題傾向として、果物や食べ物に関する語彙が頻繁に出題される。",
	derivations: [
		{ id: 1, text: "apple cider", translation: "リンゴ酒" },
		{ id: 2, text: "apple tree", translation: "リンゴの木" },
	],
	phrasal_verbs: [
		{ id: 1, text: "polish the apple", translation: "おべっかを使う" },
		{ id: 2, text: "apple of one's eye", translation: "最愛の人" },
	],
	synonyms: [
		{ id: 1, text: "fruit", translation: "果物" },
		{ id: 2, text: "pome", translation: "仁果（じんか）" },
	],
	antonyms: [{ id: 1, text: "vegetable", translation: "野菜" }],
	types: [1],
	other: "リンゴは世界中で栽培され、さまざまな品種がある。",
};

const WordPage = () => {
	return (
		<>
			<WordForm wordDetail={mockData} />
		</>
	);
};

export default WordPage;
