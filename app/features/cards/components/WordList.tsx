import { DndContext, type DragEndEvent, closestCenter } from "@dnd-kit/core";
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

interface WordListProps {
	initialWords: WordData[];
}

const WordList = ({ initialWords }: WordListProps) => {
	// words の状態を WordList 内で管理
	const [words, setWords] = useState<WordData[]>(initialWords);

	const handleDragEnd = (event: DragEndEvent) => {
		try {
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

			// position の計算
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

			// words 配列を更新し、position を変更
			const updatedWords = words.map((word) =>
				word.word_tag_id === Number(active.id)
					? { ...word, position: newPosition }
					: word,
			);

			// position でソートして order を維持
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
					onDragEnd={handleDragEnd}
					autoScroll={{ threshold: { x: 0.2, y: 0.2 }, acceleration: 70 }}
				>
					<SortableContext
						items={words.map((word) => word.word_tag_id.toString())}
						strategy={verticalListSortingStrategy}
					>
						<ScrollArea
							className="sm:h-[78vh] min-h-[40vh] w-full rounded-md border"
							aria-label="単語カードリスト"
						>
							<div className="p-4 space-y-2">
								{words.map((word) => (
									<WordCard
										key={word.word_tag_id}
										word={word.word}
										word_tag_id={word.word_tag_id.toString()}
									/>
								))}
							</div>
						</ScrollArea>
					</SortableContext>
				</DndContext>
			) : (
				<EmptyState />
			)}
		</>
	);
};

export default WordList;
