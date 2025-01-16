import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import ImageSetting from "./ImageSetting";
import Speech from "./Speech";
import WordAccordion from "./WordAccordion";

const WordAccordions = () => {
	return (
		<ScrollArea className="p-3 flex-grow">
			<WordAccordion
				id="frequency"
				title="頻出度"
				content={
					<Badge variant="destructive" className="text-sm">
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
					<>
						<div className="flex">
							<div>
								<p>men and women</p>
								<p className="text-xs">男女</p>
							</div>
							<Speech word="men and women" size={24} />
						</div>
						<div className="flex">
							<div>
								<p>men's clothing</p>
								<p className="text-xs">男性用衣類</p>
							</div>
							<Speech word="men's clothing" size={24} />
						</div>
						<div className="flex">
							<div>
								<p>men's rights</p>
								<p className="text-xs">男性の権利</p>
							</div>
							<Speech word="men's rights" size={24} />
						</div>
						<div className="flex">
							<div>
								<p>men in uniform</p>
								<p className="text-xs">制服を着た男性</p>
							</div>
							<Speech word="men in uniform" size={24} />
						</div>
						<div className="flex">
							<div>
								<p>strong men</p>
								<p className="text-xs">力強い男性</p>
							</div>
							<Speech word="strong men" size={24} />
						</div>
					</>
				}
			/>
			<WordAccordion
				id="examples"
				title="例文"
				content={
					<>
						<div className="flex">
							<div>
								<p>I need to get off the bus at the next stop</p>
								<p className="text-xs">
									次の停留所でバスを降りる必要があります。
								</p>
							</div>
							<Speech
								word="I need to get off the bus at the next stop"
								size={24}
							/>
						</div>
						<div className="flex">
							<div>
								<p>What time do you usually get off work?</p>
								<p className="text-xs">通常は何時に仕事を終えますか？</p>
							</div>
							<Speech word="What time do you usually get off work?" size={24} />
						</div>
						<div className="flex">
							<div>
								<p>Please get off the phone we need to talk in person.</p>
								<p className="text-xs">
									電話を切ってください。直接話す必要があります。
								</p>
							</div>
							<Speech
								word="Please get off the phone we need to talk in person."
								size={24}
							/>
						</div>
					</>
				}
			/>
			<WordAccordion
				title="その他重要事項"
				content={
					<p>
						「get
						off」は非常に多用途で、日常会話やビジネスシーンでよく使用されます。また、特定の状況において、よりカジュアルに使われることが多いため、親しい間柄での会話でも頻繁に見られます。さらに、「get
						off」には「免除される」や「罰を受けない」という意味もあり、「He got
						off with just a
						warning.」（彼は警告だけで済んだ。）のように使われることもあります。このように、文脈によって意味が変わるため、柔軟に理解することが重要です。
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
