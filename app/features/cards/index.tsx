import {} from "@dnd-kit/core";
import {} from "@dnd-kit/sortable";
import TagHeader from "~/components/layout/TagHeader";
import WordList from "./components/WordList";
import type { WordData } from "./types";
import { generateInitialPositions } from "./utils/lexorank";

const wordsList = [
	"apple",
	"banana",
	"cherry",
	"date",
	"elderberry",
	"fig",
	"grape",
	"honeydew",
	"kiwi",
	"lemon",
	"mango",
	"nectarine",
	"orange",
	"papaya",
	"quince",
	"raspberry",
	"strawberry",
	"tangerine",
	"ugli fruit",
	"vanilla",
	"watermelon",
	"xigua",
	"yellow passion fruit",
	"zucchini",
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
