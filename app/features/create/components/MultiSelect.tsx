import { Link } from "@remix-run/react";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { LabeledCheckbox } from "~/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

interface Tag {
	id: number;
	name: string;
	isChecked: boolean;
}

interface MultiSelectProps {
	availableTags: Tag[];
	value: Tag[];
	onChange: (value: Tag[]) => void;
}

const MultiSelect = ({ availableTags, value, onChange }: MultiSelectProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [newTag, setNewTag] = useState<string>("");
	const [tagError, setTagError] = useState<string | null>(null);
	const [allTags, setAllTags] = useState<Tag[]>(availableTags);

	const selectedTagNames = value
		.filter((tag) => tag.isChecked)
		.map((tag) => tag.name);

	const tagExists = (tagName: string): boolean => {
		const normalizedName = tagName.trim().toLowerCase();
		return allTags.some((tag) => tag.name.toLowerCase() === normalizedName);
	};

	const toggleTagSelection = (tagId: number, isSelected: boolean) => {
		// 既存のタグの状態を更新
		const updatedTags = value.map((tag) =>
			tag.id === tagId ? { ...tag, isChecked: isSelected } : tag,
		);

		// もし既存のタグリストになければ追加する
		if (!updatedTags.some((tag) => tag.id === tagId)) {
			const tagToAdd = allTags.find((tag) => tag.id === tagId);
			if (tagToAdd) {
				updatedTags.push({ ...tagToAdd, isChecked: isSelected });
			}
		}

		onChange(updatedTags);
	};

	const handleAddTag = () => {
		const formattedNewTag = newTag.trim();

		if (!formattedNewTag) {
			setTagError("タグを入力してください");
			setTimeout(() => setTagError(null), 3000);
			return;
		}

		if (formattedNewTag.length > 15) {
			setTagError("タグは15文字以内で入力してください");
			setTimeout(() => setTagError(null), 3000);
			return;
		}

		if (tagExists(formattedNewTag)) {
			setTagError("同じタグは追加できません");
			setTimeout(() => setTagError(null), 3000);
			return;
		}

		// 新しいIDを生成（既存の最大ID + 1）
		const maxId = Math.max(...allTags.map((tag) => tag.id), 0);
		const newId = maxId + 1;

		const newTagObj = { id: newId, name: formattedNewTag, isChecked: true };
		const updatedAllTags = [...allTags, newTagObj];
		setAllTags(updatedAllTags);

		onChange([...value, newTagObj]);

		setNewTag("");
		setTagError(null);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleAddTag();
		}
	};

	return (
		<div>
			<DropdownMenu open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
				<DropdownMenuTrigger asChild>
					<div className="relative cursor-pointer">
						<Input
							id="multi-select"
							readOnly
							data-testid="multi-select-input"
							className={cn(
								"h-10 w-full pointer-events-none border transition-colors",
								isOpen ? "border-gray-500" : "border-gray-300",
							)}
							placeholder={
								selectedTagNames.length > 0
									? ""
									: "タグを選択または追加してください"
							}
						/>
						<div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-wrap gap-2">
							{selectedTagNames.map((tagName) => (
								<Badge key={tagName} variant="outline" size="sm">
									{tagName}
								</Badge>
							))}
						</div>
					</div>
				</DropdownMenuTrigger>

				<DropdownMenuContent className="w-80 p-3">
					<div className="space-y-2">
						{allTags.map((tag) => (
							<LabeledCheckbox
								key={tag.id}
								label={tag.name}
								checked={value.find((t) => t.id === tag.id)?.isChecked || false}
								onCheckedChange={(checked: boolean) =>
									toggleTagSelection(tag.id, checked as boolean)
								}
							/>
						))}
					</div>

					<div className="my-2 flex gap-2">
						<div className="flex-1">
							<Input
								type="text"
								placeholder="タグを追加 (15文字以内)"
								className="h-9 w-full"
								value={newTag}
								onChange={(e) => setNewTag(e.target.value)}
								onKeyDown={handleKeyDown}
							/>
						</div>
						<Button
							onClick={handleAddTag}
							className="h-9 px-4"
							type="button"
							variant="secondary"
						>
							追加
						</Button>
					</div>

					{tagError && <p className="mt-2 text-red-500 text-xs">{tagError}</p>}
					{(availableTags.length > 1 ||
						(availableTags.length === 1 &&
							availableTags[0].name.toLowerCase() !== "global")) && (
						<Link
							to="/settings/tags"
							className="mt-2 text-sm text-gray-500 hover:underline"
						>
							タグを編集する →
						</Link>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default MultiSelect;
