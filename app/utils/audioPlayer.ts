export const audioPlayer = () => {
	const playAudio = async (
		audioBlob: Blob,
		setIsPlaying: (isPlaying: boolean) => void,
	) => {
		try {
			const audioUrl = URL.createObjectURL(audioBlob);
			const audio = new Audio(audioUrl);

			setIsPlaying(true);

			audio.play();

			audio.onended = () => {
				URL.revokeObjectURL(audioUrl);
				setIsPlaying(false);
			};

			audio.onerror = () => {
				alert("音声再生エラーが発生しました");
				URL.revokeObjectURL(audioUrl);
				setIsPlaying(false);
			};
		} catch (error) {
			console.error("音声再生エラー:", error);
			alert("音声再生に失敗しました");
			setIsPlaying(false);
		}
	};

	return { playAudio };
};
