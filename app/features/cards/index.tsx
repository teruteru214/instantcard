import { DndContext, type DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
	SortableContext,
	arrayMove,
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
			(word) => word.position === active.id,
		);
		const targetIndex = words.findIndex((word) => word.position === over.id);

		if (draggedItemIndex === -1 || targetIndex === -1) return;

		// 移動先の前後の position を取得
		let newPosition: string;

		if (targetIndex === 0) {
			// 先頭に移動
			newPosition = getFirstPosition();
		} else if (targetIndex === words.length - 1) {
			// 末尾に移動
			newPosition = getLastPosition();
		} else {
			// 途中に移動
			const prevPosition = words[targetIndex - 1].position;
			const nextPosition = words[targetIndex].position;
			newPosition = getMiddlePosition(prevPosition, nextPosition);
		}

		// 更新された words 配列を作成
		const updatedWords = arrayMove(words, draggedItemIndex, targetIndex).map(
			(word, index) =>
				index === targetIndex ? { ...word, position: newPosition } : word,
		);

		console.log("🔷 更新前:", JSON.stringify(words, null, 2));
		console.log("🔶 更新後:", JSON.stringify(updatedWords, null, 2));

		setWords(updatedWords);
	};

	return (
		<div className="mb-2">
			<TagHeader totalCount={words.length} />
			<DndContext
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
				autoScroll={{ threshold: { x: 0.2, y: 0.2 }, acceleration: 70 }}
			>
				<SortableContext
					items={words.map((word) => word.position)}
					strategy={verticalListSortingStrategy}
				>
					<WordList words={words} />
				</SortableContext>
			</DndContext>
		</div>
	);
};

export default CardsPage;
