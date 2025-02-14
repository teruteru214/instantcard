import WordForm from "./components/WordForm";
import type { WordDetail } from "./types";

const mockData: WordDetail = {
	tags: [
		{ id: 1, name: "果物", check: true },
		{ id: 2, name: "食べ物", check: false },
	],
	word: "apple",
	translation: "リンゴ",
	pronunciation: "ˈæp.l̩",
	meaning: "リンゴの果実。木から成る果物の一種。",
	synonyms: [
		{ id: 1, text: "fruit", translation: "果物" },
		{ id: 2, text: "pome", translation: "仁果（じんか）" },
	],
	antonyms: [{ id: 1, text: "vegetable", translation: "野菜" }],
	collocations: [
		{ id: 1, text: "eat an apple", translation: "リンゴを食べる" },
		{ id: 2, text: "apple pie", translation: "アップルパイ" },
	],
	examples: [
		{
			id: 1,
			text: "She ate an apple.",
			translation: "彼女はリンゴを食べた。",
		},
		{
			id: 2,
			text: "An apple a day keeps the doctor away.",
			translation: "1日1個のリンゴは医者を遠ざける。",
		},
	],
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
