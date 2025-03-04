import { Volume2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useAudio } from "~/hooks/useAudio";

interface SpeechProps {
	word: string;
	speakerId?: string;
	size?: number;
}

const Speech = ({
	word,
	speakerId = "en-US-Standard-B",
	size,
}: SpeechProps) => {
	const { isPlaying, fetchAudio } = useAudio();

	const handlePlay = () => {
		if (!word || word.trim() === "") {
			alert("再生する単語がありません");
			return;
		}
		fetchAudio(word, speakerId);
	};

	const buttonSizeClass = size ? `h-${size} w-${size}` : "h-10 w-10";

	return (
		<Button
			variant="ghost"
			size="icon"
			className={`p-2 rounded-full ${buttonSizeClass}`}
			onClick={!isPlaying ? handlePlay : undefined}
			aria-label={`Play pronunciation for ${word}`}
			disabled={isPlaying}
			type="button"
		>
			<Volume2 className="h-full w-full" />
		</Button>
	);
};

export default Speech;
