import { useLocation, useNavigate } from "@remix-run/react"; // Remix の useNavigate, useLocation
import { Tag, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";

const TagHeader = ({
	isHidden,
	totalCount,
}: { isHidden?: boolean; totalCount: number }) => {
	const [isTagActive, setIsTagActive] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const tags: string[] = [];

	const handleKeyDown = useCallback((event: KeyboardEvent) => {
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
	}, []);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);

	const handleTagClick = (tag: string) => {
		const currentPath = location.pathname;
		navigate(`${currentPath}?tag=${encodeURIComponent(tag)}`);
	};

	if (isHidden) return null;

	return (
		<header className="top-0 left-0 right-0 z-50 bg-white py-3">
			<div className="flex items-center justify-between">
				<Badge>
					Global
					<p className="ml-1 flex items-center justify-center h-[16px] aspect-square rounded-full p-[1.5px] text-xs text-black bg-white">
						{totalCount}
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

			{isTagActive && tags.length > 0 && (
				<div className="my-5 flex flex-wrap gap-2">
					{tags.map((tag) => (
						<Badge
							key={tag}
							variant="outline"
							size="sm"
							className="animate-fade-up cursor-pointer"
							onClick={() => handleTagClick(tag)}
						>
							{tag}
						</Badge>
					))}
				</div>
			)}

			{isTagActive && tags.length === 0 && (
				<p className="my-5 text-center text-gray-400 animate-fade-up">
					タグがありません。{" "}
					<button
						type="button"
						className="underline hover:text-gray-500"
						onClick={() => navigate("/create")}
					>
						英単語カード
					</button>
					をタグで分類できます。
				</p>
			)}
		</header>
	);
};

export default TagHeader;
