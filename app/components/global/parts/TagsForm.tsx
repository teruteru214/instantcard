import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { LabeledCheckbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import type { Tag } from "~/types/word";

const tagsSchema = z.object({
	tags: z
		.array(
			z.object({
				id: z.number(),
				name: z
					.string()
					.max(15, { message: "タグは15文字以内で入力してください" }),
				check: z.boolean(),
			}),
		)
		.default([]),
});

type TagsFormData = z.infer<typeof tagsSchema>;

interface TagsFormProps {
	initialTags: Tag[];
}

const TagsForm = ({ initialTags }: TagsFormProps) => {
	const {
		setValue,
		watch,
		formState: { errors },
	} = useForm<TagsFormData>({
		resolver: zodResolver(tagsSchema),
		defaultValues: { tags: initialTags },
	});

	const tags = watch("tags") || [];
	const [newTag, setNewTag] = useState("");
	const [tagError, setTagError] = useState<string | null>(null);

	const toggleCheck = (id: number, checked: boolean) => {
		setValue(
			"tags",
			tags.map((tag) => (tag.id === id ? { ...tag, check: checked } : tag)),
		);
	};

	const handleAddTag = () => {
		const formattedNewTag = newTag.trim().toLowerCase();
		if (!formattedNewTag || formattedNewTag.length > 15) return;

		setNewTag("");

		if (tags.some((tag) => tag.name.toLowerCase() === formattedNewTag)) {
			setTagError("同じタグは追加できません");
			setTimeout(() => setTagError(null), 3000);
			return;
		}

		setValue("tags", [
			...tags,
			{ id: Date.now(), name: formattedNewTag, check: false },
		]);

		setTagError(null);
	};

	return (
		<div className="mt-2 mb-4 px-2">
			<div className="space-y-4">
				{tags.map((tag) => (
					<LabeledCheckbox
						key={tag.id}
						label={tag.name}
						checked={tag.check}
						onCheckedChange={(checked) =>
							toggleCheck(tag.id, checked as boolean)
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
						/>
					</div>
					<Button onClick={handleAddTag} className="h-9 px-4 flex-shrink-0">
						追加
					</Button>
				</div>
			</div>

			{(errors.tags || tagError) && (
				<p className="my-2 text-red-500 text-xs">
					{errors.tags?.message || tagError}
				</p>
			)}
		</div>
	);
};

export default TagsForm;
