import { Volume2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useAudio } from "~/hooks/useAudio";

interface SpeechProps {
	word: string;
	size: number;
}

const Speech = ({ word, size }: SpeechProps) => {
	const { isPlaying, fetchAudio } = useAudio();

	const handlePlay = () => {
		if (!word || word.trim() === "") {
			alert("再生する単語がありません");
			return;
		}
		fetchAudio(word);
	};

	return (
		<Button
			variant="ghost"
			size="icon"
			className="p-2 rounded-full"
			onClick={!isPlaying ? handlePlay : undefined}
			aria-label={`Play pronunciation for ${word}`}
			disabled={isPlaying}
			type="button"
		>
			<Volume2 className={`h-${size} w-${size}`} />
		</Button>
	);
};

export default Speech;
