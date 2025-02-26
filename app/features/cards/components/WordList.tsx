import {
	DndContext,
	type DragEndEvent,
	DragOverlay,
	type DragStartEvent,
	closestCenter,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import type { WordData } from "../types";
import {
	getFirstPosition,
	getLastPosition,
	getMiddlePosition,
} from "../utils/lexorank";
import EmptyState from "./EmptyState";
import WordCard from "./WordCard";
import WordCardOverlay from "./WordCardOverlay";

interface WordListProps {
	initialWords: WordData[];
}

const WordList = ({ initialWords }: WordListProps) => {
	const [words, setWords] = useState<WordData[]>(initialWords);

	// ドラッグ中の word を保持
	const [activeWord, setActiveWord] = useState<WordData | null>(null);

	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;
		const wordData = words.find((w) => w.word === active.id);
		if (wordData) {
			setActiveWord(wordData);
		}
	};

	const handleDragEnd = (event: DragEndEvent) => {
		try {
			const { active, over } = event;
			setActiveWord(null);

			// over 先がない or 同じ要素なら何もしない
			if (!over || active.id === over.id) return;

			const draggedIndex = words.findIndex((w) => w.word === active.id);
			const targetIndex = words.findIndex((w) => w.word === over.id);
			if (draggedIndex === -1 || targetIndex === -1) return;

			const isMovingDown = draggedIndex < targetIndex;

			// Lexorank で position を再計算
			let newPosition: string;
			if (isMovingDown) {
				const prevPosition = words[targetIndex].position;
				const nextPosition =
					targetIndex < words.length - 1
						? words[targetIndex + 1].position
						: getLastPosition();
				newPosition = getMiddlePosition(prevPosition, nextPosition);
			} else {
				const prevPosition =
					targetIndex > 0
						? words[targetIndex - 1].position
						: getFirstPosition();
				const nextPosition = words[targetIndex].position;
				newPosition = getMiddlePosition(prevPosition, nextPosition);
			}

			// position を更新
			const updatedWords = words.map((w) =>
				w.word === active.id ? { ...w, position: newPosition } : w,
			);

			const sortedWords = [...updatedWords].sort((a, b) =>
				a.position.localeCompare(b.position),
			);

			console.log("🔷 更新前:", JSON.stringify(words, null, 2));
			console.log("🔶 更新後:", JSON.stringify(sortedWords, null, 2));

			setWords(sortedWords);
		} catch (error) {
			console.error(
				"❌ ドラッグ＆ドロップの処理中にエラーが発生しました:",
				error,
			);
		}
	};

	return (
		<>
			{words.length > 0 ? (
				<DndContext
					modifiers={[restrictToVerticalAxis]}
					collisionDetection={closestCenter}
					onDragStart={handleDragStart}
					onDragEnd={handleDragEnd}
					autoScroll={{ threshold: { x: 0.2, y: 0.2 }, acceleration: 70 }}
				>
					<SortableContext
						items={words.map((wordData) => wordData.word)}
						strategy={verticalListSortingStrategy}
					>
						<ScrollArea
							className="sm:h-[78vh] min-h-[40vh] w-full rounded-md border"
							aria-label="単語カードリスト"
						>
							<div className="p-4 space-y-2">
								{words.map((wordData) => (
									<WordCard
										key={wordData.word}
										word={wordData.word}
										isDragging={activeWord?.word === wordData.word}
									/>
								))}
							</div>
						</ScrollArea>
					</SortableContext>

					<DragOverlay>
						{activeWord && <WordCardOverlay word={activeWord.word} />}
					</DragOverlay>
				</DndContext>
			) : (
				<EmptyState />
			)}
		</>
	);
};

export default WordList;
