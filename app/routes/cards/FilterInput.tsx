// FilterInput.tsx

import { useState } from "react";
import { Input } from "~/components/ui/input";
import WordList from "./WordList";

interface FilterInputProps {
	words: string[];
	children?: React.ReactNode;
}

const FilterInput = ({ words, children }: FilterInputProps) => {
	const [filterText, setFilterText] = useState("");
	return (
		<div className="mt-10">
			<Input
				placeholder="英単語を絞り込めます"
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
