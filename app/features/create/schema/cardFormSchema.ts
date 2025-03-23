import { z } from "zod";

export const formSchema = z.object({
	word: z
		.string()
		.min(1, { message: "英単語を入力してください" })
		.max(50, { message: "50文字以内で入力してください" })
		.regex(/^[a-zA-Z\s-]+$/, { message: "英単語は半角英字のみ使用可能です" })
		.trim(),

	tags: z
		.array(z.string())
		.min(1, { message: "少なくとも1つのタグを選択してください" }),

	aiOutputs: z.array(z.string()),
});

export type FormData = z.infer<typeof formSchema>;
