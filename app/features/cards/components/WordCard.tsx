import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";

import WordDetails from "~/components/global/WordDetails";
import { Card } from "~/components/ui/card";
import DeleteModal from "./DeleteModal";

interface WordCardProps {
	word: string;
	word_tag_id: string;
	style?: React.CSSProperties;
}

const WordCard = ({ word, word_tag_id, style }: WordCardProps) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({
			id: word_tag_id,
		});

	return (
		<div
			ref={setNodeRef}
			style={{
				transform: CSS.Transform.toString(transform),
				transition,
			}}
			className="flex items-center w-full"
		>
			{/* Grip (ドラッグ可能エリア) */}
			<div
				className="cursor-grab flex-shrink-0 touch-none bg-gray-200 hover:bg-gray-300 px-2 py-3 rounded-l-md"
				{...listeners}
				{...attributes}
				aria-label="ドラッグハンドル"
			>
				<GripVertical className="h-[18px] w-[18px] text-gray-400 hover:text-gray-500" />
			</div>

			{/* WordCard 本体 */}
			<Card
				style={style}
				className="flex-1 bg-white border rounded-r-md px-3 py-2"
			>
				<WordDetails
					triggerElement={
						<p className="text-gray-700 truncate cursor-pointer hover:underline">
							{word}
						</p>
					}
					word={word}
				/>
			</Card>

			{/* 削除ボタン */}
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
