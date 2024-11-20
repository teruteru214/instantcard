import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import DeleteModal from "~/components/global/DeleteModal";
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
				<div className="flex items-center space-x-1">
					<div className="block sm:hidden">
						<DeleteModal
							word={word}
							triggerElement={
								<Trash2
									aria-label="削除"
									className="h-7 w-7 text-gray-400 hover:text-gray-500 cursor-pointer p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded"
								/>
							}
						/>
					</div>
					<div
						className="cursor-grab flex-shrink-0"
						{...listeners}
						{...attributes}
						aria-label="ドラッグハンドル"
					>
						<GripVertical className="h-7 w-7 text-gray-400 hover:text-gray-500" />
					</div>
				</div>
			</div>
		</Card>
	);
};

export default WordCard;
