import { Pause, Volume2 } from "lucide-react";
import { useCallback, useState } from "react";

interface SpeechProps {
	word: string;
	size: number;
}

const Speech = ({ word, size }: SpeechProps) => {
	const [isSpeaking, setIsSpeaking] = useState(false);

	const speak = useCallback(() => {
		if (!window.speechSynthesis) {
			alert("音声合成APIがサポートされていません");
			return;
		}

		if (window.speechSynthesis.speaking) {
			window.speechSynthesis.cancel();
		}

		const utterance = new SpeechSynthesisUtterance(word);
		utterance.lang = "en-US";
		utterance.pitch = 1.5;

		try {
			utterance.voice =
				speechSynthesis
					.getVoices()
					.find((voice) => voice.name.includes("Google UK English")) || null;

			utterance.onstart = () => setIsSpeaking(true);
			utterance.onend = () => setIsSpeaking(false);
			utterance.onerror = (_event: SpeechSynthesisErrorEvent) => {
				alert("音声合成エラーが発生しました");
				setIsSpeaking(false);
			};

			window.speechSynthesis.speak(utterance);
		} catch (_error: unknown) {
			alert("音声合成の初期化でエラーが発生しました");
			setIsSpeaking(false);
		}
	}, [word]);

	const stopSpeaking = useCallback(() => {
		speechSynthesis.cancel();
		setIsSpeaking(false);
	}, []);

	return (
		<div
			className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 cursor-pointer"
			onClick={isSpeaking ? stopSpeaking : speak}
			onKeyUp={(e) =>
				e.key === "Enter" && (isSpeaking ? stopSpeaking() : speak())
			}
			aria-label={`Play pronunciation for ${word}`}
		>
			{isSpeaking ? (
				<Pause width={size} height={size} />
			) : (
				<Volume2 width={size} height={size} />
			)}
		</div>
	);
};

export default Speech;
