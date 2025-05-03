import { useNavigate } from "@remix-run/react";
import { ArrowLeft, Lightbulb, LightbulbOff, Tags, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";

import TagsDropdownMenu from "~/components/global/TagsDropDown";
import { Button } from "~/components/ui/button";
import type { Tag } from "~/types/word";
import DeleteModal from "./DeleteModal";

interface EditHeaderProps {
	tags: Tag[];
	word: string;
	input: boolean; // ← 初期値として使用
	isDisabled: boolean;
	onSubmit: (input: boolean) => void;
}

const EditHeader = ({
	tags,
	word,
	input: initialInput,
	isDisabled,
	onSubmit,
}: EditHeaderProps) => {
	const navigate = useNavigate();

	const [input, setInput] = useState<boolean>(initialInput);

	const handleInputToggle = useCallback(() => {
		setInput((prev) => !prev);
	}, []);

	const handleSubmit = () => {
		onSubmit(input);
	};

	return (
		<div className="sticky top-0 left-0 right-0 z-50 bg-white py-3 flex items-center justify-between">
			<div className="space-x-2">
				<Button
					type="button"
					variant="ghost"
					size="icon"
					onClick={() => navigate(-1)}
				>
					<ArrowLeft className="text-gray-400 hover:text-gray-500" />
				</Button>
				<Button
					variant="black"
					size="sm"
					type="submit"
					onClick={handleSubmit}
					disabled={isDisabled}
					className="text-sm"
				>
					保存する
				</Button>
			</div>

			<div className="flex justify-end items-center space-x-2">
				<Button
					className="text-sm"
					variant={input ? "orange" : "outline"}
					size="sm"
					onClick={handleInputToggle}
				>
					{input ? (
						<Lightbulb className="w-4 h-4" />
					) : (
						<LightbulbOff className="w-4 h-4" />
					)}
					{input ? "input済" : "input中"}
				</Button>

				<TagsDropdownMenu
					tags={tags}
					triggerElement={
						<Button
							variant="ghost"
							className="text-sm text-gray-400 hover:text-gray-500"
						>
							<Tags className="-mr-1" />
							<span className="hidden sm:block">タグ</span>
						</Button>
					}
				/>

				<DeleteModal
					word={word}
					triggerElement={
						<Button
							type="button"
							variant="ghost"
							className="text-sm text-red-400 hover:text-red-500"
						>
							<Trash2 className="-mr-1" />
							<span className="hidden sm:block">ゴミ箱に入れる</span>
						</Button>
					}
				/>
			</div>
		</div>
	);
};

export default EditHeader;
