import WordDetails from "~/components/global/WordDetails";
import { Card } from "~/components/ui/card";
import type { WordProps } from "~/types/word";

const WordCard = ({ word }: WordProps) => {
	return (
		<Card>
			<div className="p-2">
				<WordDetails
					triggerElement={
						<p className="inline-block text-xl hover:cursor-pointer hover:underline">
							{word}
						</p>
					}
					word={word}
				/>
			</div>
		</Card>
	);
};

export default WordCard;
