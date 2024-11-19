import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import WordDetails from "~/components/global/WordDetails";
import { Card } from "~/components/ui/card";

interface WordCardProps {
	word: UniqueIdentifier;
	style?: React.CSSProperties;
	isOverlay?: boolean;
}

const WordCard = ({ word, style, isOverlay }: WordCardProps) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: word,
	});

	const sortableStyle = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	if (typeof word !== "string") {
		console.error("WordDetails requires a string, but received:", word);
		return null;
	}

	return (
		<Card
			ref={setNodeRef}
			style={{ ...sortableStyle, ...style }}
			className={`relative ${isDragging || isOverlay ? "bg-gray-100" : ""} w-full`}
		>
			<div className="flex justify-between items-center p-2">
				<div className="flex-1 overflow-hidden">
					<WordDetails
						triggerElement={
							<p className="text-xl hover:cursor-pointer hover:underline truncate overflow-hidden whitespace-nowrap">
								{word}
							</p>
						}
						word={word}
					/>
				</div>
				<div
					className="cursor-grab ml-2 flex-shrink-0"
					{...listeners}
					{...attributes}
					aria-label="ドラッグハンドル"
				>
					<GripVertical className="h-7 w-7 text-gray-400 hover:text-gray-500" />
				</div>
			</div>
		</Card>
	);
};

export default WordCard;
