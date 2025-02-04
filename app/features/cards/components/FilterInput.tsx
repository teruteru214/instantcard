import type { UniqueIdentifier } from "@dnd-kit/core";
import { Filter } from "lucide-react";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import WordList from "./WordList";

interface FilterInputProps {
	words: UniqueIdentifier[];
	children?: React.ReactNode;
}

const FilterInput = ({ words, children }: FilterInputProps) => {
	const [filterText, setFilterText] = useState("");

	return (
		<div className="mt-10">
			<Input
				placeholder="英単語で絞り込めます"
				icon={<Filter className="h-4 w-4 text-gray-400" />}
				onChange={(e) => setFilterText(e.target.value)}
			/>
			<div className="flex my-4 space-x-2">
				<WordList words={words} filterText={filterText} />
				{children}
			</div>
		</div>
	);
};

export default FilterInput;
