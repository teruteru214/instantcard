import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
	Book,
	GripVertical,
	Lightbulb,
	LightbulbOff,
	Trash2,
} from "lucide-react";
import WordDetails from "~/components/global/WordDetails";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import DeleteModal from "./DeleteModal";

interface WordCardProps {
	word: string;
	input: boolean;
	isDragging?: boolean;
	onInputToggle?: (word: string) => void;
}

const WordCard = ({
	word,
	input,
	isDragging = false,
	onInputToggle,
}: WordCardProps) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({
			id: word,
		});

	const handleInputToggle = () => {
		onInputToggle?.(word);
	};

	return (
		<div
			ref={setNodeRef}
			style={{
				transform: CSS.Transform.toString(transform),
				transition,
			}}
			className={`flex items-center w-full group ${isDragging ? "opacity-0" : ""}`}
		>
			<div
				className="flex-shrink-0 touch-none bg-gray-200 hover:bg-gray-300 px-2 py-3 rounded-l-md cursor-grab"
				{...listeners}
				{...attributes}
				aria-label="ドラッグハンドル"
			>
				<GripVertical className="h-[18px] w-[18px] text-gray-400 hover:text-gray-500" />
			</div>

			<Card className="flex-1 bg-white border rounded-r-md px-3 py-2">
				<WordDetails
					triggerElement={
						<p className="text-gray-700 truncate cursor-pointer hover:underline">
							{word}
						</p>
					}
					word={word}
				/>
			</Card>
			<Button
				className="hidden md:flex ml-2 text-sm" // この行を変更
				variant={input ? "orange" : "outline"}
				size="sm"
				onClick={handleInputToggle}
			>
				{input ? (
					<Lightbulb className="w-4 h-4" />
				) : (
					<LightbulbOff className="w-4 h-4" />
				)}
				{input ? "input済" : "input中"}
			</Button>
			<WordDetails
				triggerElement={
					<Book
						aria-label="辞書"
						className="ml-2 h-5 w-5 text-gray-400 hover:text-gray-500 cursor-pointer"
					/>
				}
				word={word}
			/>
			<DeleteModal
				word={word}
				triggerElement={
					<Trash2
						aria-label="削除"
						className="ml-2 h-5 w-5 text-gray-400 hover:text-gray-500 cursor-pointer"
					/>
				}
			/>
		</div>
	);
};

export default WordCard;
