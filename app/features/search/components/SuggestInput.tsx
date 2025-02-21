import { useRef, useState } from "react";
import { cn } from "~/lib/utils";
import { useDebounce } from "../hooks/useDebounce";

interface Suggestion {
	word: string;
}

const SuggestInput = () => {
	const [inputValue, setInputValue] = useState("");
	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const debouncedFetch = useDebounce(600);

	const handleInputChange = (value: string) => {
		setInputValue(value);
		setIsOpen(false);

		const controller = new AbortController();
		const signal = controller.signal;

		debouncedFetch(async () => {
			if (value.trim()) {
				try {
					const response = await fetch(
						`https://api.datamuse.com/words?sp=${encodeURIComponent(value)}*&max=10`,
						{ signal },
					);
					if (!response.ok) {
						throw new Error("サジェスト取得に失敗しました");
					}
					const data: Suggestion[] = await response.json();
					setSuggestions(data);
					setIsOpen(data.length > 0);
				} catch {
					setSuggestions([]);
					throw new Error("サジェスト取得に失敗しました");
				}
			} else {
				setSuggestions([]);
				setIsOpen(false);
			}
		});
	};

	const handleBlur = () => setTimeout(() => setIsOpen(false), 100);

	const handleFocus = () => setIsOpen(!!inputValue.trim());

	return (
		<div className="relative w-full">
			<div className="rounded-lg border shadow-md bg-white">
				<div className="relative">
					<input
						ref={inputRef}
						type="text"
						placeholder="英単語を入力してください"
						value={inputValue}
						onChange={(e) => handleInputChange(e.target.value)}
						onBlur={handleBlur}
						onFocus={handleFocus}
						className="h-11 w-full rounded-lg py-2 pl-4 pr-4 text-sm focus:outline-none"
						aria-label="検索キーワード"
						aria-haspopup="listbox"
						aria-expanded={isOpen}
						aria-controls="suggestions-list"
					/>
				</div>

				{/* サジェストリスト（スクロールなし） */}
				{isOpen && (
					<ul
						id="suggestions-list"
						className="py-2"
						aria-labelledby="suggestions-list"
					>
						{suggestions.map((suggestion) => (
							<li
								key={suggestion.word}
								className={cn(
									"cursor-pointer px-4 py-2 text-sm transition-colors",
									"hover:bg-gray-50 text-gray-700",
								)}
								onClick={() => {
									setInputValue(suggestion.word);
									setIsOpen(false);
									inputRef.current?.blur();
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										setInputValue(suggestion.word);
										setIsOpen(false);
										inputRef.current?.blur();
									}
								}}
							>
								{suggestion.word}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default SuggestInput;
