import { Volume2 } from "lucide-react";
import { useCallback, useState } from "react";

interface SpeechProps {
	word: string;
	size: number;
}

const Speech = ({ word, size }: SpeechProps) => {
	const [isSpeaking, setIsSpeaking] = useState(false);

	const speak = useCallback(async () => {
		if (!window.speechSynthesis) {
			alert("音声合成APIがサポートされていません");
			return;
		}

		if (!word || word.trim() === "") {
			alert("再生する単語がありません");
			return;
		}

		if (window.speechSynthesis.speaking) {
			window.speechSynthesis.cancel();
		}

		const utterance = new SpeechSynthesisUtterance(word);
		utterance.lang = "en-US";

		try {
			const loadVoices = () => {
				return new Promise<SpeechSynthesisVoice[]>((resolve) => {
					const voices = speechSynthesis.getVoices();
					if (voices.length > 0) {
						resolve(voices);
					} else {
						speechSynthesis.addEventListener(
							"voiceschanged",
							() => {
								resolve(speechSynthesis.getVoices());
							},
							{ once: true },
						);
					}
				});
			};

			try {
				const voices = await loadVoices();
				const voice = voices.find((v) => v.lang === "en-US");
				if (!voice) {
					throw new Error("英語の音声が見つかりません");
				}
				utterance.voice = voice;
			} catch (error) {
				console.error("音声の初期化エラー:", error);
				alert(
					error instanceof Error ? error.message : "音声の初期化に失敗しました",
				);
				return;
			}

			utterance.onstart = () => setIsSpeaking(true);
			utterance.onend = () => setIsSpeaking(false);
			utterance.onerror = (_event) => {
				alert("音声合成エラーが発生しました");
				setIsSpeaking(false);
			};

			window.speechSynthesis.speak(utterance);
		} catch (_error: unknown) {
			alert("音声合成の初期化でエラーが発生しました");
			setIsSpeaking(false);
		}
	}, [word]);

	return (
		<div
			className={`flex items-center justify-center p-2 rounded-full cursor-pointer ${
				isSpeaking ? "opacity-50" : "hover:bg-gray-100"
			}`}
			onClick={!isSpeaking ? speak : undefined}
			onKeyUp={(e) => !isSpeaking && e.key === "Enter" && speak()}
			aria-label={`Play pronunciation for ${word}`}
		>
			<Volume2 width={size} height={size} />
		</div>
	);
};

export default Speech;
