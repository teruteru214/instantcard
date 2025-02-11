import { Tag, X } from "lucide-react";
import { useRef, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";

interface TagHeaderProps {
	onTagChange?: (selectedTag: string | null) => void;
	isHidden?: boolean; // 追加: 拡大時に非表示にするため
}

const TagHeader = ({ onTagChange, isHidden }: TagHeaderProps) => {
	const [isTagActive, setIsTagActive] = useState(false);

	const isListening = useRef(false);

	// キーボードショートカット処理
	const handleKeyDown = (event: KeyboardEvent) => {
		switch (event.key) {
			case "t":
				setIsTagActive(true);
				break;
			case "Escape":
				setIsTagActive(false);
				break;
			default:
				break;
		}
	};

	if (!isListening.current) {
		// 初回レンダリング時にイベントリスナーを登録
		document.addEventListener("keydown", handleKeyDown);
		isListening.current = true;
	}

	// タグの変更処理
	const handleTagClick = (tag: string) => {
		if (onTagChange) {
			onTagChange(tag);
		}
	};

	// `isHidden` が true ならヘッダーを非表示にする
	if (isHidden) return null;

	return (
		<header className="top-0 left-0 right-0 z-50 bg-white py-3">
			<div className="flex items-center justify-between">
				<Badge>
					Global
					<p className="ml-1 flex items-center justify-center h-[16px] aspect-square rounded-full p-[1.5px] text-[10px] text-black bg-white">
						67
					</p>
				</Badge>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Button
								size="icon"
								variant="outline"
								onClick={() => setIsTagActive((prev) => !prev)}
							>
								{isTagActive ? <X /> : <Tag />}
							</Button>
						</TooltipTrigger>
						<TooltipContent side="bottom">
							{isTagActive ? (
								<>
									閉じる <span className="bg-gray-100 p-1 rounded">esc</span>
								</>
							) : (
								<>
									タグを選択 <span className="bg-gray-100 p-1 rounded">T</span>
								</>
							)}
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>

			{isTagActive && (
				<div className="my-5 flex flex-wrap gap-2">
					<Badge
						variant="outline"
						size="sm"
						className="animate-fade-up"
						onClick={() => handleTagClick("TOEIC")}
					>
						TOEIC
					</Badge>
					<Badge
						variant="outline"
						size="sm"
						className="animate-fade-up"
						onClick={() => handleTagClick("プログラミング")}
					>
						プログラミング
					</Badge>
				</div>
			)}
		</header>
	);
};

export default TagHeader;
