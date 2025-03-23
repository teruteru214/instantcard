import { Card, CardContent } from "~/components/ui/card";
import type { SlideWord } from "../types";
import SlideItemTranslation from "./SlideItemTranslation";
import SlideItemWord from "./SlideItemWord";

interface SlideCardProps {
	item: SlideWord;
	index: number;
	totalItems: number;
	showImages: boolean;
}

const SlideCard = ({
	item,
	index,
	totalItems,
	showImages,
}: SlideCardProps): JSX.Element => {
	return (
		<div className="my-3 p-1">
			<Card className="rounded-md">
				<CardContent className="flex flex-col items-center aspect-square justify-center p-6">
					{item.word && (
						<SlideItemWord
							word={item.word}
							index={index}
							totalItems={totalItems}
						/>
					)}
					{item.translation && (
						<SlideItemTranslation
							translation={item.translation}
							img={item.img}
							showImages={showImages}
						/>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default SlideCard;
