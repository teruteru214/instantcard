import { Link } from "@remix-run/react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { LabeledCheckbox } from "~/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import type { Tag } from "~/types/word";

interface CreateTagsDropDownProps {
	triggerElement: React.ReactNode;
	tags: Tag[];
	onTagsChange: (tags: Tag[]) => void;
}

const CreateTagsDropDown = ({
	triggerElement,
	tags,
	onTagsChange,
}: CreateTagsDropDownProps) => {
	const [localTags, setLocalTags] = useState<Tag[]>(tags);
	const [newTag, setNewTag] = useState("");
	const [tagError, setTagError] = useState<string | null>(null);

	// タグのチェック状態を切り替える
	const toggleTagCheck = (id: number, isChecked: boolean) => {
		const updatedTags = localTags.map((tag) =>
			tag.id === id ? { ...tag, isChecked } : tag,
		);
		setLocalTags(updatedTags);
		onTagsChange(updatedTags);
	};

	// 新しいタグを追加する
	const handleAddTag = () => {
		const formattedNewTag = newTag.trim().toLowerCase();
		if (!formattedNewTag || formattedNewTag.length > 15) return;

		setNewTag("");

		// 既存のタグと重複しないかチェック
		if (localTags.some((tag) => tag.name.toLowerCase() === formattedNewTag)) {
			setTagError("同じタグは追加できません");
			setTimeout(() => setTagError(null), 3000);
			return;
		}

		const updatedTags = [
			...localTags,
			{ id: Date.now(), name: formattedNewTag, isChecked: true },
		];

		setLocalTags(updatedTags);
		onTagsChange(updatedTags);
		setTagError(null);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{triggerElement}</DropdownMenuTrigger>
			<DropdownMenuContent className="w-80 p-2">
				<DropdownMenuLabel>タグを付与する</DropdownMenuLabel>
				<div className="space-y-2 mt-2">
					{localTags.map((tag) => (
						<LabeledCheckbox
							key={tag.id}
							label={tag.name}
							checked={tag.isChecked}
							onCheckedChange={(checked) =>
								toggleTagCheck(tag.id, checked as boolean)
							}
						/>
					))}

					<div className="flex gap-2">
						<div className="flex-1">
							<Input
								type="text"
								placeholder="タグを追加 (15文字以内)"
								className="h-9 w-full"
								value={newTag}
								onChange={(e) => setNewTag(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										handleAddTag();
									}
								}}
							/>
						</div>
						<Button
							onClick={handleAddTag}
							className="h-9 px-4 flex-shrink-0"
							type="button"
						>
							追加
						</Button>
					</div>
				</div>

				{tagError && <p className="my-2 text-red-500 text-xs">{tagError}</p>}

				{localTags.length > 0 && (
					<div className="mt-2">
						<Link
							to="/settings/tags"
							className="text-sm text-gray-500 hover:underline"
						>
							タグを編集する →
						</Link>
					</div>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default CreateTagsDropDown;
