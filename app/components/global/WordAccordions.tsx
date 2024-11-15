import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import ImageSetting from "./ImageSetting";
import WordAccordion from "./WordAccordion";

const WordAccordions = () => {
	return (
		<ScrollArea className="p-3 flex-grow">
			<WordAccordion
				id="frequency"
				title="頻出度"
				content={
					<Badge variant="alert" className="text-sm">
						🥇目から鱗
					</Badge>
				}
			/>
			<WordAccordion
				id="syllables"
				title="音節"
				content={
					<p>
						「turbo」の音節は2つです。英語では「tur-bo」と分けることができます。発音的には「TUR-bo」となり、最初の音節が強調される形になります。
					</p>
				}
			/>
			<WordAccordion
				id="meaning"
				title="意味"
				content={
					<p>
						Menは「男性」または「男たち」という意味の名詞で、特に成人男性を指します。単数形は「man」です。
					</p>
				}
			/>
			<WordAccordion
				id="etymology"
				title="語源"
				content={
					<p>
						古英語の"mann"に由来し、もともとは「人」を意味しましたが、時とともに「男性」を特に指す言葉として使われるようになりました。
					</p>
				}
			/>
			<WordAccordion
				id="collocations"
				title="コロケーション"
				content={
					<div>
						<p>men and women: 男女</p>
						<p>strong men: 力強い男性</p>
					</div>
				}
			/>
			<WordAccordion
				id="examples"
				title="例文"
				content={
					<p>
						"I need to get off the bus at the next
						stop"は、「次の停留所でバスを降りる」という意味です。
					</p>
				}
			/>
			<WordAccordion
				id="image-section"
				title="イメージ"
				content={<ImageSetting />}
			/>
		</ScrollArea>
	);
};

export default WordAccordions;
