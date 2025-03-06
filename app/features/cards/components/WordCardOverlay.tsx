// WordCardOverlay.tsx
import { GripVertical } from "lucide-react";
import WordDetails from "~/components/global/WordDetails";
import { Card } from "~/components/ui/card";

interface WordCardOverlayProps {
	word: string;
}

const WordCardOverlay = ({ word }: WordCardOverlayProps) => {
	return (
		<div
			data-word-id={word}
			className="flex items-center w-full scale-100 shadow-lg bg-white rounded-md cursor-grabbing"
		>
			<div
				className="flex-shrink-0 touch-none bg-gray-300 px-3 py-4 rounded-l-md "
				aria-label="ドラッグハンドル"
			>
				<GripVertical className="h-[22px] w-[22px] text-gray-500" />
			</div>

			<Card className="flex-1 bg-white border px-4 py-3 rounded-r-md">
				<WordDetails
					triggerElement={
						<p className="text-gray-800 text-lg font-medium truncate hover:underline">
							{word}
						</p>
					}
					word={word}
				/>
			</Card>
		</div>
	);
};

export default WordCardOverlay;
