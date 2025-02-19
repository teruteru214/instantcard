import { ScrollArea } from "~/components/ui/scroll-area";
import EmptyState from "./EmptyState";
import WordCard from "./WordCard";

interface WordListProps {
	words: string[];
}

const WordList = ({ words }: WordListProps) => {
	return (
		<>
			{words.length > 0 ? (
				<ScrollArea className="sm:h-[78vh] min-h-[75vh] w-full rounded-md border">
					<div className="p-4 space-y-2">
						{words.map((word) => (
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
