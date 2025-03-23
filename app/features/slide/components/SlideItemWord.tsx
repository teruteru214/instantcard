import { Info } from "lucide-react";
import Speech from "~/components/global/Speech";
import WordDetails from "~/components/global/WordDetails";
import { Button } from "~/components/ui/button";

interface SlideItemWordProps {
	word: string;
	index: number;
	totalItems: number;
}

const SlideItemWord = ({
	word,
	index,
	totalItems,
}: SlideItemWordProps): JSX.Element => {
	return (
		<div className="relative w-full h-full flex items-center justify-center">
			<p className="text-2xl sm:text-4xl font-semibold text-center">{word}</p>
			<div className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-2">
				<div>
					<WordDetails
						word={word}
						triggerElement={
							<Button variant="ghost" size="icon">
								<Info />
							</Button>
						}
					/>
				</div>

				<p className="text-center">
					{Math.ceil((index + 1) / 2)}/{Math.ceil(totalItems / 2)}
				</p>

				<div>
					<Speech word={word} />
				</div>
			</div>
		</div>
	);
};

export default SlideItemWord;
