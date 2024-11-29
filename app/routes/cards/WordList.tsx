import type { UniqueIdentifier } from "@dnd-kit/core";
import { useMemo } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import EmptyState from "./EmptyState";
import WordCard from "./WordCard";

interface WordListProps {
	words: UniqueIdentifier[];
	filterText: string;
}

const WordList = ({ words, filterText }: WordListProps) => {
	const filteredWords = useMemo(() => {
		let result = words;

		if (filterText) {
			result = result.filter(
				(word) =>
					typeof word === "string" &&
					word.toLowerCase().includes(filterText.toLowerCase()),
			);
		}

		return result;
	}, [words, filterText]);

	return (
		<>
			{filteredWords.length > 0 ? (
				<ScrollArea className="sm:h-[78vh] min-h-[30vh] w-full sm:w-2/3 rounded-md sm:border overflow-hidden">
					<div className="sm:m-4 space-y-2">
						{filteredWords.map((word) => (
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
