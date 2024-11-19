import {
	DndContext,
	type DragEndEvent,
	type DragOverEvent,
	DragOverlay,
	type DragStartEvent,
	type UniqueIdentifier,
	pointerWithin,
} from "@dnd-kit/core";
import {
	SortableContext,
	arrayMove,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import DropZone from "./DropZone";
import FilterInput from "./FilterInput";
import WordCard from "./WordCard";

const CardsPage = () => {
	const [words, setWords] = useState<UniqueIdentifier[]>([
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

	const [activeWord, setActiveWord] = useState<UniqueIdentifier | null>(null);

	const handleDragStart = (event: DragStartEvent) => {
		setActiveWord(event.active.id);
	};

	const handleDragOver = (event: DragOverEvent) => {
		const { over } = event;

		if (!over || over.id === "dropzone") {
			return;
		}
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		setActiveWord(null);

		if (!over) return;

		if (over.id === "dropzone") {
			setWords((prev) => prev.filter((word) => word !== active.id));
		} else if (active.id !== over.id) {
			const oldIndex = words.indexOf(active.id);
			const newIndex = words.indexOf(over.id);
			setWords(arrayMove(words, oldIndex, newIndex));
		}
	};

	return (
		<DndContext
			collisionDetection={pointerWithin}
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
			autoScroll={{
				threshold: { x: 0.2, y: 0.2 },
				acceleration: 70,
			}}
		>
			<SortableContext items={words} strategy={verticalListSortingStrategy}>
				<FilterInput words={words}>
					<DropZone />
				</FilterInput>
			</SortableContext>
			<DragOverlay>
				{activeWord ? <WordCard word={activeWord} isOverlay /> : null}
			</DragOverlay>
		</DndContext>
	);
};

export default CardsPage;
