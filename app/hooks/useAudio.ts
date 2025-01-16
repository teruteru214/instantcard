import { useCallback, useState } from "react";
import { audioPlayer } from "~/utils/audioPlayer";

export const useAudio = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const { playAudio } = audioPlayer();

	const fetchAudio = useCallback(
		async (text: string) => {
			try {
				setIsPlaying(true);

				const response = await fetch("/api/audio", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ text }),
				});

				if (!response.ok) {
					throw new Error("音声ファイルの取得に失敗しました");
				}

				const data: { audioContent: string } = await response.json();

				const binaryString = atob(data.audioContent);
				const audioBuffer = new Uint8Array(
					binaryString.split("").map((char) => char.charCodeAt(0)),
				);

				const blob = new Blob([audioBuffer], { type: "audio/wav" });
				await playAudio(blob, setIsPlaying);
			} catch (error) {
				console.error("音声処理エラー:", error);
				alert(
					error instanceof Error ? error.message : "音声処理に失敗しました",
				);
				setIsPlaying(false);
			}
		},
		[playAudio],
	);

	return { isPlaying, fetchAudio };
};
