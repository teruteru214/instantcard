import Autoplay from "embla-carousel-autoplay";
import {
	Infinity as InfinityIcon,
	Info,
	Maximize,
	Minimize,
	Pause,
	Play,
	Shuffle,
} from "lucide-react";
import { useState } from "react";
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

export type WordData = {
	id: string;
	word?: string;
	translation?: string;
	img?: string;
};

const mockData: WordData[] = [
	{ id: "1-question", word: "apple" },
	{
		id: "1-answer",
		translation: "りんご",
		img: "https://images.unsplash.com/photo-1623815242959-fb20354f9b8d?q=80&w=987&auto=format&fit=crop",
	},
	{ id: "2-question", word: "banana" },
	{
		id: "2-answer",
		translation: "バナナ",
		img: "https://images.unsplash.com/photo-1623227774108-7ab4478f50cf?q=80&w=987&auto=format&fit=crop",
	},
	{ id: "3-question", word: "cat" },
	{ id: "3-answer", translation: "猫" },
	{ id: "4-question", word: "dog" },
	{
		id: "4-answer",
		translation: "犬",
		img: "https://images.unsplash.com/photo-1601758063541-d2f50b4aafb2?q=80&w=1105&auto=format&fit=crop",
	},
	{ id: "5-question", word: "elephant" },
	{
		id: "5-answer",
		translation: "象",
		img: "https://images.unsplash.com/photo-1509587837663-52b8687980c5?q=80&w=1102&auto=format&fit=crop",
	},
];

const WordsSlide = () => {
	const [slide, setSlide] = useState({
		isPlaying: false,
		playbackSpeed: 5, // 秒単位で管理
		isLooping: true,
		isSizing: false,
		data: mockData,
	});

	const shuffleSlides = (data: WordData[]) => {
		const grouped = data.reduce<Record<string, WordData[]>>((acc, item) => {
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

	return (
		<div className="flex flex-col justify-center items-center">
			<div className={slide.isSizing ? "w-10/12" : "w-8/12"}>
				<Carousel
					opts={{ loop: slide.isLooping }}
					plugins={plugins}
					className="w-full"
				>
					<CarouselContent>
						{slide.data.map((item) => (
							<CarouselItem key={item.id}>
								<div className="p-1">
									<Card>
										<CardContent className="flex flex-col items-center aspect-square justify-center p-6">
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
											{item.translation && (
												<div>
													{item.img ? (
														<div>
															<img
																src={item.img}
																alt={item.translation}
																className="w-28 h-28 sm:w-48 sm:h-48 object-cover rounded-md mb-2"
															/>
															<p className="text-xl sm:text-2xl text-center">
																{item.translation}
															</p>
														</div>
													) : (
														<p className="text-2xl sm:text-4xl text-center">
															{item.translation}
														</p>
													)}
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
				<Slider
					value={[slide.playbackSpeed]}
					max={20}
					min={1}
					step={1}
					onValueChange={(value) =>
						setSlide((prev) => ({ ...prev, playbackSpeed: value[0] }))
					}
					className="w-full my-2"
				/>
				<p className="text-xs text-center text-gray-400">
					スライド速度: {slide.playbackSpeed}秒
				</p>
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
							setSlide((prev) => ({ ...prev, data: shuffleSlides(prev.data) }))
						}
					>
						<Shuffle className="w-6 h-6" />
					</Button>
					<Button
						size="icon"
						onClick={() =>
							setSlide((prev) => ({ ...prev, isSizing: !prev.isSizing }))
						}
					>
						{slide.isSizing ? <Minimize /> : <Maximize />}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default WordsSlide;
