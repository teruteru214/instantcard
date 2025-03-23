import Autoplay from "embla-carousel-autoplay";
import NoCard from "~/components/global/NoCard";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "~/components/ui/carousel";
import { useKeyboardControls } from "../hooks/useKeyboardControls";
import { useSlideState } from "../hooks/useSlideState";
import type { SlideWord } from "../types";

import SlideCard from "./SlideCard";
import { SlideControls } from "./SlideControls";

interface WordsSlideProps {
	data: SlideWord[];
	isSizing: boolean;
	setIsSizing: (value: boolean) => void;
}

const WordsSlide = ({
	data,
	isSizing,
	setIsSizing,
}: WordsSlideProps): JSX.Element => {
	const {
		slide,
		togglePlay,
		toggleLoop,
		toggleImages,
		setPlaybackSpeed,
		handleShuffle,
		handleSlideTouch,
	} = useSlideState(data);

	// 拡大縮小トグル関数
	const toggleSizing = () => setIsSizing(!isSizing);

	// キーボードコントロールの設定
	useKeyboardControls({
		togglePlay,
		setIsSizing,
	});

	// Autoplayプラグインの設定
	const plugins = slide.isPlaying
		? [Autoplay({ delay: slide.playbackSpeed * 1000 })]
		: [];

	// データが空の場合
	if (data.length === 0) {
		return <NoCard />;
	}

	return (
		<div className="flex flex-col justify-center items-center">
			<div className={isSizing ? "w-10/12" : "w-9/12"}>
				<Carousel
					opts={{ loop: slide.isLooping }}
					plugins={plugins}
					className="w-full"
					aria-label="単語学習スライド"
					onPointerDown={handleSlideTouch}
				>
					<CarouselContent>
						{slide.data.map((item, index) => (
							<CarouselItem
								key={item.id}
								aria-label={`スライド: ${item.word || item.translation}`}
							>
								<SlideCard
									item={item}
									index={index}
									totalItems={data.length}
									showImages={slide.showImages}
								/>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>

				<SlideControls
					isPlaying={slide.isPlaying}
					togglePlay={togglePlay}
					playbackSpeed={slide.playbackSpeed}
					setPlaybackSpeed={setPlaybackSpeed}
					showImages={slide.showImages}
					toggleImages={toggleImages}
					isLooping={slide.isLooping}
					toggleLoop={toggleLoop}
					handleShuffle={handleShuffle}
					isSizing={isSizing}
					toggleSizing={toggleSizing}
				/>
			</div>
		</div>
	);
};

export default WordsSlide;
