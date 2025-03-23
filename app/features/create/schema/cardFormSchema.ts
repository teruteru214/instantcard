import { z } from "zod";

const tagSchema = z.object({
	name: z
		.string()
		.nonempty("タグを入力してください")
		.max(15, { message: "タグは15文字以内で入力してください" }),
	isChecked: z.boolean(),
});

export const cardFormSchema = z.object({
	word: z
		.string()
		.min(1, { message: "英単語を入力してください" })
		.max(50, { message: "50文字以内で入力してください" })
		.regex(/^[a-zA-Z\s-]+$/, { message: "英単語は半角英字のみ使用可能です" })
		.trim(),

	tags: z.array(tagSchema).refine(
		(tags) => {
			const tagNames = tags.map((tag) => tag.name.toLowerCase());
			return new Set(tagNames).size === tagNames.length;
		},
		{
			message: "タグ名が重複しています",
			path: ["tags"],
		},
	),

	aiOutputs: z.array(z.string()),
});

export type CardFormData = z.infer<typeof cardFormSchema>;
