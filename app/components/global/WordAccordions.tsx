import type { WordData } from "~/types/word";
import { frequencyLabel } from "~/utils/frequencyLabel";
import { translateGrammarType } from "~/utils/translate";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import ImageSetting from "./ImageSetting";
import Speech from "./Speech";
import WordAccordion from "./parts/WordAccordion";

interface WordAccordionsProps {
	word: string;
	data: WordData;
}

const WordAccordions = ({ word, data }: WordAccordionsProps) => {
	return (
		<ScrollArea className="p-3 flex-grow">
			<WordAccordion
				id="translation"
				title="翻訳"
				content={<p>{data.translation}</p>}
			/>
			{data.meaning && (
				<WordAccordion
					id="meaning"
					title="意味"
					content={<p>{data.meaning}</p>}
				/>
			)}
			{data.pronunciation && (
				<WordAccordion
					id="pronunciation"
					title="発音のコツ"
					content={<p>{data.pronunciation}</p>}
				/>
			)}
			{data.examples && (
				<WordAccordion
					id="examples"
					title="例文"
					content={data.examples.map((ex) => (
						<div key={ex.text} className="flex">
							<div>
								<p>{ex.text}</p>
								<p className="text-xs">{ex.translation}</p>
							</div>
							<Speech word={ex.text} />
						</div>
					))}
				/>
			)}
			{data.collocations && (
				<WordAccordion
					id="collocations"
					title="コロケーション"
					content={data.collocations.map((col) => (
						<div key={col.text} className="flex">
							<div>
								<p>{col.text}</p>
								<p className="text-xs">{col.translation}</p>
							</div>
							<Speech word={col.text} />
						</div>
					))}
				/>
			)}
			{data.frequency && (
				<WordAccordion
					id="frequency"
					title="英語圏での使用頻度"
					content={
						<Badge variant={frequencyLabel(data.frequency).variant} size="sm">
							{frequencyLabel(data.frequency).label}
						</Badge>
					}
				/>
			)}
			{data.derivations && (
				<WordAccordion
					id="derivations"
					title="派生語"
					content={data.derivations.map((der) => (
						<div key={der.text} className="flex">
							<div>
								<p>{der.text}</p>
								<p className="text-xs">{der.translation}</p>
							</div>
							<Speech word={der.text} />
						</div>
					))}
				/>
			)}
			{data.antonyms && (
				<WordAccordion
					id="antonyms"
					title="対義語"
					content={data.antonyms.map((ant) => (
						<div key={ant.text} className="flex">
							<div>
								<p>{ant.text}</p>
								<p className="text-xs">{ant.translation}</p>
							</div>
							<Speech word={ant.text} />
						</div>
					))}
				/>
			)}
			{data.types && (
				<WordAccordion
					id="types"
					title="文法の種類"
					content={data.types.map((type) => (
						<Badge key={type.name} variant="outline" size="sm">
							{translateGrammarType(type.name)}
						</Badge>
					))}
				/>
			)}
			<WordAccordion
				id="etymology"
				title="語源"
				content={data.etymology ? <p>{data.etymology}</p> : <p>なし</p>}
			/>
			<WordAccordion
				id="note"
				title="ノート"
				content={data.note ? <p>{data.note}</p> : <p>なし</p>}
			/>
			<WordAccordion
				id="image-section"
				title="イメージ"
				content={<ImageSetting word={word} />}
			/>
		</ScrollArea>
	);
};

export default WordAccordions;
