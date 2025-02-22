import { useRef, useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import { cn } from "~/lib/utils";
import { useDebounce } from "../hooks/useDebounce";

interface Suggestion {
	word: string;
}

interface SuggestInputProps {
	field: ControllerRenderProps<{ word: string }, "word">; // 🔥 型を修正
	maxLength?: number;
}

const SuggestInput = ({ field, maxLength = 50 }: SuggestInputProps) => {
	const [inputValue, setInputValue] = useState(field.value || ""); // 🔥 初期値を設定
	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const debouncedFetch = useDebounce(600);

	const handleInputChange = (value: string) => {
		if (value.length > maxLength) return;
		setInputValue(value);
		setIsOpen(false);
		field.onChange(value);

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

	const handleBlur = () => {
		setTimeout(() => setIsOpen(false), 100);
		field.onBlur(); // 🔥 react-hook-form の `onBlur` を呼び出す
	};

	const handleFocus = () => setIsOpen(!!inputValue.trim());

	return (
		<div className="relative w-full">
			<div className="rounded-lg border bg-white">
				<div className="relative">
					<input
						ref={(el) => {
							field.ref(el); // 🔥 ref を react-hook-form に渡す
							inputRef.current = el;
						}}
						type="text"
						placeholder="英単語を入力してください"
						value={inputValue}
						onChange={(e) => handleInputChange(e.target.value)}
						onBlur={handleBlur}
						onFocus={handleFocus}
						maxLength={maxLength}
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
									field.onChange(suggestion.word); // 🔥 react-hook-form に選択値を反映
									setIsOpen(false);
									inputRef.current?.blur();
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										setInputValue(suggestion.word);
										field.onChange(suggestion.word);
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
