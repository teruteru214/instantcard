import {
	Expand,
	Hourglass,
	Image,
	ImageOff,
	Infinity as InfinityIcon,
	Minimize2,
	Pause,
	Play,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTriggerNoButton,
} from "~/components/ui/tooltip";
import PlaybackSpeedControl from "./PlaybackSpeedControl";

interface SlideControlsProps {
	isPlaying: boolean;
	togglePlay: () => void;
	playbackSpeed: number;
	setPlaybackSpeed: (speed: number) => void;
	showImages: boolean;
	toggleImages: () => void;
	isLooping: boolean;
	toggleLoop: () => void;
	isSizing: boolean;
	toggleSizing: () => void;
}

export const SlideControls = ({
	isPlaying,
	togglePlay,
	playbackSpeed,
	setPlaybackSpeed,
	showImages,
	toggleImages,
	isLooping,
	toggleLoop,
	isSizing,
	toggleSizing,
}: SlideControlsProps) => {
	// 拡大時のコントロールパネルのスタイル
	const containerStyle = isSizing
		? "fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 py-3 px-4 flex justify-center gap-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full shadow-lg"
		: "mb-4 flex justify-center gap-3";

	// ドロップダウンの配置調整（拡大時は上向き）
	const dropdownSide = isSizing ? "top" : "bottom";

	// ツールチップの配置調整（拡大時は上向き）
	const tooltipSide = isSizing ? "top" : "bottom";

	return (
		<div className={containerStyle}>
			<TooltipProvider>
				<Tooltip>
					<TooltipTriggerNoButton>
						<Button
							size="icon"
							variant={isPlaying ? "black" : "default"}
							onClick={togglePlay}
							className="h-10 w-10"
						>
							{isPlaying ? (
								<Pause className="h-5 w-5" />
							) : (
								<Play className="h-5 w-5" />
							)}
						</Button>
					</TooltipTriggerNoButton>
					<TooltipContent side={tooltipSide}>
						{isPlaying ? (
							<>
								停止 <span className="bg-gray-100 p-1 rounded">K / Space</span>
							</>
						) : (
							<>
								再生 <span className="bg-gray-100 p-1 rounded">K / Space</span>
							</>
						)}
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button size="icon" className="h-10 w-10">
						<Hourglass className="h-5 w-5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-72" side={dropdownSide}>
					<DropdownMenuLabel>
						スライド1枚あたりの表示時間を設定
					</DropdownMenuLabel>
					<PlaybackSpeedControl
						playbackSpeed={playbackSpeed}
						setPlaybackSpeed={setPlaybackSpeed}
					/>
				</DropdownMenuContent>
			</DropdownMenu>

			<TooltipProvider>
				<Tooltip>
					<TooltipTriggerNoButton>
						<Button
							size="icon"
							variant={showImages ? "black" : "default"}
							onClick={toggleImages}
							className="h-10 w-10"
						>
							{showImages ? (
								<Image className="h-5 w-5" />
							) : (
								<ImageOff className="h-5 w-5" />
							)}
						</Button>
					</TooltipTriggerNoButton>
					<TooltipContent side={tooltipSide}>
						{showImages ? "画像表示" : "画像非表示"}
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<TooltipProvider>
				<Tooltip>
					<TooltipTriggerNoButton>
						<Button
							size="icon"
							variant={isLooping ? "black" : "default"}
							onClick={toggleLoop}
							className="h-10 w-10"
						>
							<InfinityIcon className="h-5 w-5" />
						</Button>
					</TooltipTriggerNoButton>
					<TooltipContent side={tooltipSide}>
						ループ: {isLooping ? "オン" : "オフ"}
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<TooltipProvider>
				<Tooltip>
					<TooltipTriggerNoButton>
						<Button
							size="icon"
							variant={isSizing ? "black" : "default"}
							onClick={toggleSizing}
							className="h-10 w-10"
						>
							{isSizing ? (
								<Minimize2 className="h-5 w-5" />
							) : (
								<Expand className="h-5 w-5" />
							)}
						</Button>
					</TooltipTriggerNoButton>
					<TooltipContent side={tooltipSide}>
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
	);
};
