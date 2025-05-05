import { useEffect, useRef, useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import { cn } from "~/lib/utils";

import { useDebounce } from "~/hooks/useDebounce";
import type { Word } from "~/types/word";
import type { WordFormData } from "../schema/wordFormSchema";

interface SuggestState {
	suggestions: Word[];
	isOpen: boolean;
	selectedIndex: number;
}

interface SuggestInputProps {
	field: ControllerRenderProps<WordFormData, "word">;
}

const SuggestInput = ({ field }: SuggestInputProps) => {
	const [inputValue, setInputValue] = useState(field.value || "");
	const [suggestState, setSuggestState] = useState<SuggestState>({
		suggestions: [],
		isOpen: false,
		selectedIndex: -1,
	});
	const inputRef = useRef<HTMLInputElement | null>(null);
	const debouncedFetch = useDebounce(300);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	const DATAMUSE_API_URL = import.meta.env.VITE_DATAMUSE_API_URL;

	const handleInputChange = (value: string) => {
		setInputValue(value);
		setSuggestState((prev) => ({
			...prev,
			suggestions: [],
			isOpen: false,
			selectedIndex: -1,
		}));
		field.onChange(value);

		debouncedFetch(async () => {
			if (!value.trim()) return;

			try {
				const response = await fetch(
					`${DATAMUSE_API_URL}?sp=${encodeURIComponent(value)}*&max=10`,
				);
				if (!response.ok) throw new Error("サジェスト取得に失敗しました");

				const data: Word[] = await response.json();
				setSuggestState({
					suggestions: data,
					isOpen: data.length > 0,
					selectedIndex: -1,
				});
			} catch {
				setSuggestState((prev) => ({
					...prev,
					suggestions: [],
					isOpen: false,
				}));
			}
		});
	};

	const handleBlur = () => {
		setTimeout(
			() => setSuggestState((prev) => ({ ...prev, isOpen: false })),
			100,
		);
		field.onBlur();
	};

	const handleFocus = () => {
		if (inputValue.trim()) {
			setSuggestState((prev) => ({ ...prev, isOpen: true }));
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		// Ctrl+N (次の候補へ)
		if (e.ctrlKey && e.key === "n") {
			e.preventDefault();
			setSuggestState((prev) => ({
				...prev,
				selectedIndex:
					prev.selectedIndex < prev.suggestions.length - 1
						? prev.selectedIndex + 1
						: 0,
			}));
		}
		// Ctrl+P (前の候補へ)
		else if (e.ctrlKey && e.key === "p") {
			e.preventDefault();
			setSuggestState((prev) => ({
				...prev,
				selectedIndex:
					prev.selectedIndex > 0
						? prev.selectedIndex - 1
						: prev.suggestions.length - 1,
			}));
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			setSuggestState((prev) => ({
				...prev,
				selectedIndex:
					prev.selectedIndex < prev.suggestions.length - 1
						? prev.selectedIndex + 1
						: 0,
			}));
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setSuggestState((prev) => ({
				...prev,
				selectedIndex:
					prev.selectedIndex > 0
						? prev.selectedIndex - 1
						: prev.suggestions.length - 1,
			}));
		} else if (e.key === "Enter") {
			e.preventDefault();
			if (
				suggestState.selectedIndex >= 0 &&
				suggestState.suggestions.length > 0
			) {
				handleOptionSelect(
					suggestState.suggestions[suggestState.selectedIndex].word,
					false,
				);
			}
		} else if (e.key === "Escape") {
			e.preventDefault();
			setInputValue("");
			field.onChange("");
			setSuggestState({ suggestions: [], isOpen: false, selectedIndex: -1 });
			inputRef.current?.blur();
		}
	};

	const handleOptionSelect = (word: string, shouldBlur = true) => {
		setInputValue(word);
		field.onChange(word);
		setSuggestState({ suggestions: [], isOpen: false, selectedIndex: -1 });
		if (shouldBlur) {
			inputRef.current?.blur();
		}
	};

	return (
		<div className="relative w-full">
			<div className="rounded-md">
				<div className="relative">
					<input
						ref={(el) => {
							field.ref(el);
							inputRef.current = el;
						}}
						type="text"
						placeholder="英単語を入力してください"
						value={inputValue}
						onChange={(e) => handleInputChange(e.target.value)}
						onBlur={handleBlur}
						onFocus={handleFocus}
						onKeyDown={handleKeyDown}
						className={cn(
							"h-10 w-full border border-gray-300 bg-background text-base",
							"placeholder:text-muted-foreground focus-visible:outline-none",
							"focus-visible:border-gray-500 disabled:cursor-not-allowed",
							"disabled:opacity-50 transition-colors duration-200 py-2 px-4",
							suggestState.isOpen
								? "rounded-t-md border-b-0"
								: "rounded-md border-b border-gray-300",
						)}
						aria-label="検索キーワード"
						aria-haspopup="listbox"
						aria-expanded={suggestState.isOpen}
						aria-controls="suggestions-list"
					/>
				</div>

				{suggestState.isOpen && (
					<ul
						id="suggestions-list"
						role="menu"
						className="absolute z-10 w-full border-x border-b border-gray-500 rounded-b-md bg-white top-full shadow-lg"
						aria-labelledby="suggestions-list"
					>
						{suggestState.suggestions.map((suggestion, index) => (
							<button
								key={suggestion.word}
								type="button"
								aria-current={
									index === suggestState.selectedIndex ? "true" : undefined
								}
								tabIndex={0}
								className={cn(
									"cursor-pointer px-4 py-2 text-sm transition-colors w-full text-left",
									"hover:bg-gray-100 rounded-md text-gray-700",
									index === suggestState.selectedIndex ? "bg-gray-200" : "",
								)}
								onClick={() => handleOptionSelect(suggestion.word)}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										handleOptionSelect(suggestion.word);
									}
								}}
							>
								{suggestion.word}
							</button>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default SuggestInput;
