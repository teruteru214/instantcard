import { useState } from "react";
import type { SlideWord } from "../types";

interface SlideState {
	isPlaying: boolean;
	playbackSpeed: number;
	isLooping: boolean;
	showImages: boolean;
	data: SlideWord[];
}

interface UseSlideStateReturn {
	slide: SlideState;
	togglePlay: () => void;
	toggleLoop: () => void;
	toggleImages: () => void;
	setPlaybackSpeed: (speed: number) => void;
	handleSlideTouch: () => void;
}

export const useSlideState = (
	initialData: SlideWord[],
): UseSlideStateReturn => {
	const [slide, setSlide] = useState<SlideState>({
		isPlaying: false,
		playbackSpeed: 5,
		isLooping: true,
		showImages: true,
		data: initialData,
	});

	const togglePlay = () => {
		setSlide((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
	};

	const toggleLoop = () => {
		setSlide((prev) => ({ ...prev, isLooping: !prev.isLooping }));
	};

	const toggleImages = () => {
		setSlide((prev) => ({ ...prev, showImages: !prev.showImages }));
	};

	const setPlaybackSpeed = (speed: number) => {
		setSlide((prev) => ({ ...prev, playbackSpeed: speed }));
	};

	const handleSlideTouch = () => {
		setSlide((prev) => ({ ...prev, isPlaying: false }));
	};

	return {
		slide,
		togglePlay,
		toggleLoop,
		toggleImages,
		setPlaybackSpeed,
		handleSlideTouch,
	};
};
