import { ScrollArea } from "~/components/ui/scroll-area";
import type { WordData } from "../types";
import EmptyState from "./EmptyState";
import WordCard from "./WordCard";

interface WordListProps {
	words: WordData[];
}

const WordList = ({ words }: WordListProps) => {
	return (
		<>
			{words.length > 0 ? (
				<ScrollArea className="sm:h-[78vh] min-h-[75vh] w-full rounded-md border">
					<div className="p-4 space-y-2">
						{words.map((words) => (
							<WordCard
								key={words.word_tag_id}
								word={words.word}
								position={words.position}
							/>
						))}
					</div>
				</ScrollArea>
			) : (
				<EmptyState />
			)}
		</>
	);
};

export default WordList;
