import Autoplay from "embla-carousel-autoplay";
import {
	Expand,
	Hourglass,
	Image,
	ImageOff,
	Infinity as InfinityIcon,
	Info,
	Minimize2,
	Pause,
	Play,
	Shuffle,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Slider } from "~/components/ui/slider";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTriggerNoButton,
} from "~/components/ui/tooltip";
import type { SlideWord } from "../types";

interface WordsSlideProps {
	data: SlideWord[];
	isSizing: boolean;
	setIsSizing: (value: boolean) => void;
}

const WordsSlide = ({ data, isSizing, setIsSizing }: WordsSlideProps) => {
	const [slide, setSlide] = useState({
		isPlaying: false,
		playbackSpeed: 5,
		isLooping: true,
		showImages: true,
		data: data, // data を state に保持
	});

	// キーバインドの処理
	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			switch (event.key) {
				case "f":
					setIsSizing(true);
					event.preventDefault();
					break;
				case "-":
					setIsSizing(false);
					event.preventDefault();
					break;
				case " ":
				case "k":
					setSlide((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
					event.preventDefault();
					break;
				default:
					break;
			}
		},
		[setIsSizing],
	);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);

	// シャッフル関数
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

	const handleShuffle = () => {
		setSlide((prev) => ({
			...prev,
			data: shuffleSlides(prev.data),
		}));
	};

	const plugins = slide.isPlaying
		? [Autoplay({ delay: slide.playbackSpeed * 1000 })]
		: [];

	const handleSlideTouch = () => {
		setSlide((prev) => ({ ...prev, isPlaying: false }));
	};

	return data.length === 0 ? (
		<>
			<NoCard type="slide" />
		</>
	) : (
		<div className="flex flex-col justify-center items-center">
			<div className={isSizing ? "w-10/12" : "w-8/12"}>
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
								<div className="mt-2 mb-3 p-1">
									<Card className="rounded-md">
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
													<p className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
														{Math.ceil((slide.data.indexOf(item) + 1) / 2)}/
														{Math.ceil(data.length / 2)}
													</p>
													<div className="absolute bottom-2 right-2">
														<Speech word={item.word} />
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

				<div className="flex justify-center space-x-3">
					{/* ▶ / ⏸ 再生・停止 */}
					<TooltipProvider>
						<Tooltip>
							<TooltipTriggerNoButton>
								<Button
									size="icon"
									variant={slide.isPlaying ? "black" : "default"}
									onClick={() =>
										setSlide((prev) => ({
											...prev,
											isPlaying: !prev.isPlaying,
										}))
									}
								>
									{slide.isPlaying ? <Pause /> : <Play />}
								</Button>
							</TooltipTriggerNoButton>
							<TooltipContent side="bottom">
								{slide.isPlaying ? (
									<>
										停止{" "}
										<span className="bg-gray-100 p-1 rounded">K / Space</span>
									</>
								) : (
									<>
										再生{" "}
										<span className="bg-gray-100 p-1 rounded">K / Space</span>
									</>
								)}
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					{/* ⏳ スライド1枚あたりの表示時間設定 */}
					<TooltipProvider>
						<Tooltip>
							<TooltipTriggerNoButton>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button size="icon">
											<Hourglass />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="w-72 space-y-2">
										<DropdownMenuLabel>
											スライド1枚あたりの表示時間を設定
										</DropdownMenuLabel>
										<div className="flex justify-center items-center">
											<Slider
												value={[slide.playbackSpeed]}
												max={20}
												min={1}
												step={1}
												onValueChange={(value) =>
													setSlide((prev) => ({
														...prev,
														playbackSpeed: value[0],
													}))
												}
												className="w-64 my-2"
												aria-label="スライド表示速度の調整"
											/>
										</div>
										<p className="px-2 text-left">{slide.playbackSpeed}秒</p>
									</DropdownMenuContent>
								</DropdownMenu>
							</TooltipTriggerNoButton>
							<TooltipContent side="bottom">
								スライド1枚あたりの表示時間
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					{/* 🖼 / 🚫🖼 画像表示・非表示 */}
					<TooltipProvider>
						<Tooltip>
							<TooltipTriggerNoButton>
								<Button
									size="icon"
									variant={slide.showImages ? "black" : "default"}
									onClick={() =>
										setSlide((prev) => ({
											...prev,
											showImages: !prev.showImages,
										}))
									}
								>
									{slide.showImages ? <Image /> : <ImageOff />}
								</Button>
							</TooltipTriggerNoButton>
							<TooltipContent side="bottom">
								{slide.showImages ? "画像非表示" : "画像表示"}
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					{/* ♾ ループ切り替え */}
					<TooltipProvider>
						<Tooltip>
							<TooltipTriggerNoButton>
								<Button
									size="icon"
									variant={slide.isLooping ? "black" : "default"}
									onClick={() =>
										setSlide((prev) => ({
											...prev,
											isLooping: !prev.isLooping,
										}))
									}
								>
									<InfinityIcon />
								</Button>
							</TooltipTriggerNoButton>
							<TooltipContent side="bottom">
								ループ{slide.isLooping ? "オフ" : "オン"}
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					{/* 🔀 スライドシャッフル */}
					<TooltipProvider>
						<Tooltip>
							<TooltipTriggerNoButton>
								<Button size="icon" onClick={handleShuffle}>
									<Shuffle />
								</Button>
							</TooltipTriggerNoButton>
							<TooltipContent side="bottom">
								スライドをシャッフル
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					{/* ⛶ / ⛌ 拡大・縮小 */}
					<TooltipProvider>
						<Tooltip>
							<TooltipTriggerNoButton>
								<Button
									size="icon"
									variant={isSizing ? "black" : "default"}
									onClick={() => setIsSizing(!isSizing)}
								>
									{isSizing ? <Minimize2 /> : <Expand />}
								</Button>
							</TooltipTriggerNoButton>
							<TooltipContent side="bottom">
								{isSizing ? (
									<>
										縮小 <span className="bg-gray-100 p-1 rounded">-</span>
									</>
								) : (
									<>
										拡大 <span className="bg-gray-100 p-1 rounded">F</span>
									</>
								)}
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>
		</div>
	);
};

export default WordsSlide;
