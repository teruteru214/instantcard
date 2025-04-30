import TagHeader from "~/components/layout/TagHeader";
import WordList from "./components/WordList";
import type { WordData } from "./types";
import { generateInitialPositions } from "./utils/lexorank";

const wordsList = [
	{ word: "apple", input: false },
	{ word: "banana", input: false },
	{ word: "cherry", input: false },
	{ word: "date", input: false },
	{ word: "elderberry", input: false },
	{ word: "fig", input: false },
	{ word: "grape", input: false },
	{ word: "honeydew", input: false },
	{ word: "kiwi", input: false },
	{ word: "lemon", input: false },
	{ word: "mango", input: false },
	{ word: "nectarine", input: false },
	{ word: "orange", input: false },
	{ word: "papaya", input: false },
	{ word: "quince", input: false },
	{ word: "raspberry", input: false },
	{ word: "strawberry", input: false },
	{ word: "tangerine", input: false },
	{ word: "ugli fruit", input: false },
	{ word: "vanilla", input: false },
	{ word: "watermelon", input: false },
	{ word: "xigua", input: false },
	{ word: "yellow passion fruit", input: false },
	{ word: "zucchini", input: false },
];

const initialWords: WordData[] = generateInitialPositions(wordsList);

const CardsPage = () => {
	return (
		<div className="mb-2">
			<TagHeader totalCount={wordsList.length} />
			<WordList initialWords={initialWords} />
		</div>
	);
};

export default CardsPage;
