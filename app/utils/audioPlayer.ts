export const audioPlayer = () => {
	let audioUrl: string | null = null;
	let audio: HTMLAudioElement | null = null;

	const playAudio = async (
		audioBlob: Blob,
		setIsPlaying: (isPlaying: boolean) => void,
	) => {
		try {
			if (audioUrl) URL.revokeObjectURL(audioUrl);
			audioUrl = URL.createObjectURL(audioBlob);
			audio = new Audio(audioUrl);

			setIsPlaying(true);

			audio.play();

			audio.onended = () => {
				if (audioUrl) {
					URL.revokeObjectURL(audioUrl);
					audioUrl = null;
				}
				setIsPlaying(false);
			};

			audio.onerror = () => {
				alert("音声再生エラーが発生しました");
				if (audioUrl) {
					URL.revokeObjectURL(audioUrl);
					audioUrl = null;
				}
			};
		} catch (error) {
			console.error("音声再生エラー:", error);
			alert("音声再生に失敗しました");
			setIsPlaying(false);
		}
	};

	const cleanup = () => {
		if (audio) {
			audio.pause();
			audio = null;
		}
		if (audioUrl) {
			URL.revokeObjectURL(audioUrl);
			audioUrl = null;
		}
	};

	return { playAudio, cleanup };
};
