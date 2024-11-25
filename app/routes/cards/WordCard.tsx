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

	// エラーハンドリング
	if (typeof word !== "string") {
		return null;
	}

	// isDraggingの時は`hr`のデザインをレンダリング
	if (isDragging) {
		return (
			<div
				ref={setNodeRef}
				style={{
					...style,
					transform: CSS.Transform.toString(transform),
					transition,
				}}
				className="my-0 py-0"
			>
				<hr className="border-t-4 border-[#54A2C0] my-0" />
			</div>
		);
	}

	// isOverlayの時は通常カードを背景色変更してレンダリング
	if (isOverlay) {
		return (
			<Card
				style={{ ...style }}
				className="relative w-full bg-gray-100 opacity-50 border border-gray-300"
			>
				<div className="flex justify-between items-center p-2">
					<p className="text-xl truncate overflow-hidden whitespace-nowrap">
						{word}
					</p>
					<div className="flex items-center space-x-1">
						<div className="block sm:hidden">
							<Trash2
								aria-label="削除"
								className="h-7 w-7 text-gray-400 p-1 rounded"
							/>
						</div>
						<div className="cursor-default flex-shrink-0">
							<GripVertical className="h-7 w-7 text-gray-400" />
						</div>
					</div>
				</div>
			</Card>
		);
	}

	// 通常状態のデザインをレンダリング
	return (
		<Card
			ref={setNodeRef}
			style={{
				...style,
				transform: CSS.Transform.toString(transform),
				transition,
			}}
			className="relative w-full"
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
						className="cursor-grab flex-shrink-0 touch-none"
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
