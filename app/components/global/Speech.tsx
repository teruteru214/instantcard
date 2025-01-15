import { Volume2 } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "~/components/ui/button";
import { isWordValid } from "~/utils/isWordValid";

interface SpeechProps {
	word: string;
	size: number;
}

const Speech = ({ word, size }: SpeechProps) => {
	const [isSpeaking, setIsSpeaking] = useState(false);

	const speak = useCallback(async () => {
		if (!word || word.trim() === "") {
			alert("再生する単語がありません");
			return;
		}

		try {
			setIsSpeaking(true);

			const endpoint = isWordValid(word)
				? "/api/word-audio"
				: "/api/text-audio";

			const response = await fetch(endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ text: word }),
			});

			if (!response.ok) {
				throw new Error("音声ファイルの取得に失敗しました");
			}

			const blob = await response.blob();
			const audioUrl = URL.createObjectURL(blob);

			const audio = new Audio(audioUrl);
			audio.play();

			audio.onended = () => {
				URL.revokeObjectURL(audioUrl);
				setIsSpeaking(false);
			};

			audio.onerror = () => {
				alert("音声再生エラーが発生しました");
				URL.revokeObjectURL(audioUrl);
				setIsSpeaking(false);
			};
		} catch (error) {
			console.error("音声処理エラー:", error);
			alert(error instanceof Error ? error.message : "音声処理に失敗しました");
			setIsSpeaking(false);
		}
	}, [word]);

	return (
		<Button
			variant="ghost"
			size="icon"
			className="p-2 rounded-full"
			onClick={!isSpeaking ? speak : undefined}
			aria-label={`Play pronunciation for ${word}`}
			disabled={isSpeaking}
			type="button"
		>
			<Volume2 className={`h-${size} w-${size}`} />
		</Button>
	);
};

export default Speech;
