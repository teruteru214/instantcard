import { DndContext, type DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
	SortableContext,
	arrayMove,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import TagHeader from "~/components/layout/TagHeader";
import WordList from "./components/WordList";

const CardsPage = () => {
	const [words, setWords] = useState<string[]>([
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
	]);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (!over || active.id === over.id) return;

		const oldIndex = words.indexOf(String(active.id));
		const newIndex = words.indexOf(String(over.id));

		if (oldIndex !== -1 && newIndex !== -1) {
			setWords(arrayMove(words, oldIndex, newIndex));
		}
	};

	return (
		<div className="mb-2">
			<TagHeader totalCount={words.length} />
			<DndContext
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
				autoScroll={{ threshold: { x: 0.2, y: 0.2 }, acceleration: 70 }}
			>
				<SortableContext items={words} strategy={verticalListSortingStrategy}>
					<WordList words={words} />
				</SortableContext>
			</DndContext>
		</div>
	);
};

export default CardsPage;
