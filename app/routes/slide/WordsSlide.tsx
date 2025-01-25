import Autoplay from "embla-carousel-autoplay";
import {
	Expand,
	Image,
	ImageOff,
	Infinity as InfinityIcon,
	Info,
	Minimize2,
	Pause,
	Play,
	Shuffle,
} from "lucide-react";
import { type ReactNode, useState } from "react";
import NoCard from "~/components/global/NoCard";
import Speech from "~/components/global/Speech";
import WordDetails from "~/components/global/WordDetails";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "~/components/ui/carousel";
import { Slider } from "~/components/ui/slider";
import type { SlideWord } from "~/types/word";

interface WordsSlideProps {
	data: SlideWord[];
	children?: ReactNode;
}

const WordsSlide = ({ data, children }: WordsSlideProps) => {
	const [slide, setSlide] = useState({
		isPlaying: false,
		playbackSpeed: 5,
		isLooping: true,
		isSizing: false,
		showImages: true,
		data: data,
	});

	const shuffleSlides = (data: SlideWord[]) => {
		const grouped = data.reduce<Record<string, SlideWord[]>>((acc, item) => {
			const pairId = item.id.split("-")[0];
			if (!acc[pairId]) acc[pairId] = [];
			acc[pairId].push(item);
			return acc;
		}, {});
		return Object.values(grouped)
			.sort(() => Math.random() - 0.5)
			.flat();
	};

	const plugins = slide.isPlaying
		? [Autoplay({ delay: slide.playbackSpeed * 1000 })]
		: [];

	const handleSlideTouch = () => {
		setSlide((prev) => ({ ...prev, isPlaying: false }));
	};

	return data.length === 0 ? (
		<>
			{children}
			<NoCard type="slide" />
		</>
	) : (
		<div className="flex flex-col justify-center items-center">
			{!slide.isSizing && children}
			<div className={slide.isSizing ? "w-10/12" : "w-8/12"}>
				<Carousel
					opts={{ loop: slide.isLooping }}
					plugins={plugins}
					className="w-full"
					aria-label="単語学習スライド"
					onPointerDown={handleSlideTouch}
				>
					<CarouselContent>
						{slide.data.map((item) => (
							<CarouselItem
								key={item.id}
								aria-label={`スライド: ${item.word || item.translation}`}
							>
								<div className="p-1">
									<Card>
										<CardContent className="flex flex-col items-center aspect-square justify-center p-6">
											{/* 単語データ */}
											{item.word && (
												<div className="relative w-full h-full flex items-center justify-center">
													<p className="text-2xl sm:text-4xl font-semibold text-center">
														{item.word}
													</p>
													<div className="absolute bottom-2 left-2">
														<WordDetails
															word={item.word}
															triggerElement={
																<Button variant="ghost" size="icon">
																	<Info />
																</Button>
															}
														/>
													</div>
													<div className="absolute bottom-2 right-2">
														<Speech size={6} word={item.word} />
													</div>
												</div>
											)}
											{/* 翻訳データ */}
											{item.translation && (
												<div className="relative flex items-center justify-center w-full h-full">
													{/* 背景画像 */}
													{slide.showImages && item.img && (
														<img
															src={item.img}
															alt={item.translation}
															className="absolute inset-0 w-full h-full rounded-md object-cover opacity-30"
														/>
													)}
													{/* 翻訳テキスト */}
													<p className="relative z-10 text-2xl sm:text-4xl font-semibold text-center text-gray-800">
														{item.translation}
													</p>
												</div>
											)}
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
				<div className="my-2 flex justify-center space-x-4">
					<Button
						size="icon"
						variant={slide.isPlaying ? "black" : "default"}
						onClick={() =>
							setSlide((prev) => ({ ...prev, isPlaying: !prev.isPlaying }))
						}
					>
						{slide.isPlaying ? <Pause /> : <Play />}
					</Button>
					<Button
						size="icon"
						variant={slide.isLooping ? "black" : "default"}
						onClick={() =>
							setSlide((prev) => ({ ...prev, isLooping: !prev.isLooping }))
						}
					>
						<InfinityIcon className="w-6 h-6" />
					</Button>
					<Button
						size="icon"
						onClick={() =>
							setSlide((prev) => ({
								...prev,
								data: shuffleSlides(prev.data),
							}))
						}
					>
						<Shuffle className="w-6 h-6" />
					</Button>
					<Button
						size="icon"
						variant={slide.showImages ? "black" : "default"}
						onClick={() =>
							setSlide((prev) => ({ ...prev, showImages: !prev.showImages }))
						}
					>
						{slide.showImages ? (
							<Image className="w-6 h-6" />
						) : (
							<ImageOff className="w-6 h-6" />
						)}
					</Button>
					<Button
						size="icon"
						onClick={() =>
							setSlide((prev) => ({ ...prev, isSizing: !prev.isSizing }))
						}
					>
						{slide.isSizing ? <Minimize2 /> : <Expand />}
					</Button>
				</div>
				<div className="flex justify-center items-center">
					<Slider
						value={[slide.playbackSpeed]}
						max={20}
						min={1}
						step={1}
						onValueChange={(value) =>
							setSlide((prev) => ({ ...prev, playbackSpeed: value[0] }))
						}
						className="w-60 my-2"
					/>
				</div>
				<p className="text-sm text-center text-gray-400">
					スライド速度: {slide.playbackSpeed}秒
				</p>
			</div>
		</div>
	);
};

export default WordsSlide;
