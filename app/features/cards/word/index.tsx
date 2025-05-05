import type { WordDetail } from "~/types/word";
import WordForm from "./components/WordForm";

const mockData: WordDetail = {
	tags: [
		{ id: 1, name: "プログラミング", isChecked: true },
		{ id: 2, name: "食べ物", isChecked: true },
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
	etymology:
		"「apple」という単語は古英語の「æppel」に由来し、さらにゲルマン語の「*aplaz」にまで遡ることができます。インド・ヨーロッパ語族の多くの言語に類似した単語が存在し、共通の語源を持っています。例えば、ドイツ語の「Apfel」、オランダ語の「appel」、スウェーデン語の「äpple」などがあります。古代から人類の文化と密接に関わってきた果物であり、聖書の「禁断の果実」としても象徴的に使われることがあります（実際には聖書では具体的な果物の種類は明記されていません）。また、ニュートンのリンゴの逸話や、コンピュータ会社Appleの名前の由来としても知られています。",
	note: "リンゴは世界中で栽培され、さまざまな品種がある。",
	input: false,
};

const WordPage = () => {
	return (
		<>
			<WordForm wordDetail={mockData} />
		</>
	);
};

export default WordPage;
