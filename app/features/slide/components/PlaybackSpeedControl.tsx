import { useEffect, useState } from "react";
import { Slider } from "~/components/ui/slider";

interface PlaybackSpeedControlProps {
	playbackSpeed: number;
	setPlaybackSpeed: (value: number) => void;
}

const PlaybackSpeedControl = ({
	playbackSpeed,
	setPlaybackSpeed,
}: PlaybackSpeedControlProps) => {
	const [sliderValue, setSliderValue] = useState(playbackSpeed);
	const [isDragging, setIsDragging] = useState(false);

	useEffect(() => {
		if (!isDragging) {
			setSliderValue(playbackSpeed);
		}
	}, [playbackSpeed, isDragging]);

	const handleSliderChange = (value: number[]) => {
		setIsDragging(true);
		setSliderValue(value[0]);
	};

	const handleSliderCommit = () => {
		setPlaybackSpeed(sliderValue);
		setIsDragging(false);
	};

	return (
		<div className="px-2 space-y-2 w-full">
			<div className="flex justify-center items-center">
				<Slider
					value={[sliderValue]}
					max={20}
					min={1}
					step={1}
					onValueChange={handleSliderChange}
					onValueCommit={handleSliderCommit}
					className="w-full my-2"
					aria-label="スライド表示速度の調整"
				/>
			</div>
			<p className="text-left">{sliderValue}秒</p>
		</div>
	);
};

export default PlaybackSpeedControl;
