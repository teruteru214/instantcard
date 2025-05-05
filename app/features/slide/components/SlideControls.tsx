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
	return (
		<div className="mb-4 flex justify-center space-x-3">
			<TooltipProvider>
				<Tooltip>
					<TooltipTriggerNoButton>
						<Button
							size="icon"
							variant={isPlaying ? "black" : "default"}
							onClick={togglePlay}
						>
							{isPlaying ? <Pause /> : <Play />}
						</Button>
					</TooltipTriggerNoButton>
					<TooltipContent side="bottom">
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

			{!isSizing && (
				<>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button size="icon">
								<Hourglass />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-72">
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
								>
									{showImages ? <Image /> : <ImageOff />}
								</Button>
							</TooltipTriggerNoButton>
							<TooltipContent side="bottom">
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
								>
									<InfinityIcon />
								</Button>
							</TooltipTriggerNoButton>
							<TooltipContent side="bottom">
								ループ: {isLooping ? "オン" : "オフ"}
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</>
			)}

			<TooltipProvider>
				<Tooltip>
					<TooltipTriggerNoButton>
						<Button
							size="icon"
							variant={isSizing ? "black" : "default"}
							onClick={toggleSizing}
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
	);
};
