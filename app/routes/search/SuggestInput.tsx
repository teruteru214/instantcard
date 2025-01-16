import { ArrowRight } from "lucide-react";
import { useState } from "react";

import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "~/components/ui/command";
import { useDebounce } from "./useDebounce";

interface Suggestion {
	word: string;
}

const SuggestInput = () => {
	const [inputValue, setInputValue] = useState("");
	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const debouncedFetch = useDebounce(600);

	const handleInputChange = (value: string) => {
		setInputValue(value);
		debouncedFetch(async () => {
			if (value.trim()) {
				setIsLoading(true);
				try {
					const response = await fetch(
						`/api/datamuse?query=${encodeURIComponent(value)}`,
					);
					if (!response.ok) {
						throw new Error(`サジェスト取得に失敗しました: ${response.status}`);
					}
					const data: Suggestion[] = await response.json();
					setSuggestions(data);
				} catch (error) {
					alert(
						error instanceof Error
							? error.message
							: "不明なエラーが発生しました。",
					);
					setSuggestions([]);
				} finally {
					setIsLoading(false);
				}
			} else {
				setSuggestions([]);
			}
		});
	};

	return (
		<Command
			className="rounded-lg border shadow-md md:min-w-[450px]"
			aria-label="単語検索"
		>
			<CommandInput
				placeholder="英単語を入力してください"
				value={inputValue}
				onChange={(e) => handleInputChange(e.target.value)}
				aria-label="検索キーワード"
				search
			/>
			{inputValue.trim() && (
				<CommandList>
					<CommandGroup heading="サジェストワード" aria-live="polite">
						{isLoading ? (
							<div className="flex justify-center py-4" aria-label="読み込み中">
								<div className="animate-spin h-5 w-5 border-2 border-gray-400 rounded-full border-t-transparent" />
							</div>
						) : (
							suggestions.map((suggestion) => (
								<CommandItem key={suggestion.word}>
									<ArrowRight />
									<span>{suggestion.word}</span>
								</CommandItem>
							))
						)}
					</CommandGroup>
				</CommandList>
			)}
		</Command>
	);
};

export default SuggestInput;
