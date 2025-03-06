import { useEffect, useRef, useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import { cn } from "~/lib/utils";
import { useDebounce } from "../hooks/useDebounce";

interface Suggestion {
	word: string;
}

interface SuggestInputProps {
	field: ControllerRenderProps<{ word: string }, "word">;
	maxLength?: number;
}

const SuggestInput = ({ field, maxLength = 50 }: SuggestInputProps) => {
	const [inputValue, setInputValue] = useState(field.value || "");
	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const debouncedFetch = useDebounce(600);

	// コンポーネントがマウントされた時に自動的にフォーカスする
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	const DATAMUSE_API_URL = import.meta.env.VITE_DATAMUSE_API_URL;

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
						`${DATAMUSE_API_URL}?sp=${encodeURIComponent(value)}*&max=10`,
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
			<div className="rounded-md">
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
						className={cn(
							"h-10 w-full rounded-md border border-gray-300 bg-background text-base",
							"placeholder:text-muted-foreground focus-visible:outline-none",
							"focus-visible:border-gray-500 disabled:cursor-not-allowed",
							"disabled:opacity-50 transition-colors duration-200 py-2 px-4",
							isOpen ? "rounded-b-none border-b-0" : "",
						)}
						aria-label="検索キーワード"
						aria-haspopup="listbox"
						aria-expanded={isOpen}
						aria-controls="suggestions-list"
					/>
				</div>

				{isOpen && (
					<ul
						id="suggestions-list"
						className="border border-t-0 border-gray-500 rounded-b-md bg-white py-1"
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
