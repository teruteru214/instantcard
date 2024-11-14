import { useMemo } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import EmptyState from "./EmptyState";
import WordCard from "./WordCard";

interface WordListProps {
	words: string[];
	filterText: string;
}

const WordList = ({ words, filterText }: WordListProps) => {
	const filteredWords = useMemo(
		() =>
			filterText
				? words.filter((word: string) =>
						word.toLowerCase().includes(filterText.toLowerCase()),
					)
				: words,
		[words, filterText],
	);

	return (
		<>
			{filteredWords.length > 0 ? (
				<ScrollArea className="sm:h-[78vh] h-[73vh] w-full sm:w-1/2 rounded-md border overflow-y-auto">
					<div className="m-4 space-y-2">
						{filteredWords.map((word: string) => (
							<WordCard key={word} word={word} />
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
