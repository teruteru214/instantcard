import { Bot, Tags } from "lucide-react";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import type { Tag } from "~/types/word";
import { defaultAiOptions } from "../config/aiOptions";
import AiSettings from "./AiSettings";
import CreateTagsDropDown from "./CreateTagsDropDown";

interface CreateHeaderProps {
	tags: Tag[];
	word: string;
	isDisabled: boolean;
	onSubmit: (data: { selectedTags: Tag[] }) => void;
}

const CreateHeader = ({ tags, isDisabled, onSubmit }: CreateHeaderProps) => {
	const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
	const [aiOptions, setAiOptions] = useState<string[]>(defaultAiOptions);

	const handleSubmit = () => {
		// 選択されたタグのみを含めてonSubmitを呼び出す
		onSubmit({
			selectedTags: selectedTags.filter((tag) => tag.isChecked),
		});
	};

	return (
		<div className="sticky top-0 left-0 right-0 z-50 bg-white py-3 flex items-center justify-between">
			<div className="space-x-2">
				<Button
					variant="black"
					size="sm"
					type="submit"
					onClick={handleSubmit}
					disabled={isDisabled}
					className="text-sm"
				>
					作成する
				</Button>
			</div>

			<div className="flex justify-end items-center space-x-2">
				<CreateTagsDropDown
					tags={selectedTags}
					onTagsChange={setSelectedTags}
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
				<AiSettings
					value={aiOptions}
					onChange={setAiOptions}
					triggerElement={
						<Button
							variant="ghost"
							className="text-sm text-gray-400 hover:text-gray-500"
						>
							<Bot className="-mr-1" />
							<span className="hidden sm:block">AIで出力</span>
						</Button>
					}
				/>
			</div>
		</div>
	);
};

export default CreateHeader;
