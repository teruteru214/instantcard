import { DndContext, type DragEndEvent, closestCenter } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import TagHeader from "~/components/layout/TagHeader";
import WordList from "./components/WordList";
import type { WordData } from "./types";
import {
	generateInitialPositions,
	getFirstPosition,
	getLastPosition,
	getMiddlePosition,
} from "./utils/lexorank";

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

// `position` を `LexoRank` で生成
const initialWords: WordData[] = generateInitialPositions(wordsList);

const CardsPage = () => {
	const [words, setWords] = useState<WordData[]>(initialWords);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;

		const draggedItemIndex = words.findIndex(
			(word) => word.word_tag_id === Number(active.id),
		);
		const targetIndex = words.findIndex(
			(word) => word.word_tag_id === Number(over.id),
		);

		if (draggedItemIndex === -1 || targetIndex === -1) return;

		// 移動方向を判定
		const isMovingDown = draggedItemIndex < targetIndex;

		let newPosition: string;

		if (isMovingDown) {
			// 下から上への移動
			const prevPosition = words[targetIndex].position;
			const nextPosition =
				targetIndex < words.length - 1
					? words[targetIndex + 1].position
					: getLastPosition();
			newPosition = getMiddlePosition(prevPosition, nextPosition);
		} else {
			// 上から下への移動
			const prevPosition =
				targetIndex > 0 ? words[targetIndex - 1].position : getFirstPosition();
			const nextPosition = words[targetIndex].position;
			newPosition = getMiddlePosition(prevPosition, nextPosition);
		}

		// 更新された words 配列を作成
		const updatedWords = words.map((word, index) =>
			index === draggedItemIndex ? { ...word, position: newPosition } : word,
		);

		// position でソートして order を維持
		const sortedWords = [...updatedWords].sort((a, b) =>
			a.position.localeCompare(b.position),
		);

		console.log("🔷 更新前:", JSON.stringify(words, null, 2));
		console.log("🔶 更新後:", JSON.stringify(sortedWords, null, 2));

		setWords(sortedWords);
	};

	return (
		<div className="mb-2">
			<TagHeader totalCount={words.length} />
			<DndContext
				modifiers={[restrictToVerticalAxis]}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
				autoScroll={{ threshold: { x: 0.2, y: 0.2 }, acceleration: 70 }}
			>
				<SortableContext
					items={words.map((word) => word.word_tag_id.toString())}
					strategy={verticalListSortingStrategy}
				>
					<WordList words={words} />
				</SortableContext>
			</DndContext>
		</div>
	);
};

export default CardsPage;
