import { z } from "zod";

const textPairSchema = z.object({
	id: z.number(),
	text: z
		.string()
		.nonempty("英文を入力してください")
		.max(50, { message: "英文は50文字以内で入力してください" }),
	translation: z
		.string()
		.nonempty("翻訳を入力してください")
		.max(100, { message: "翻訳は100文字以内で入力してください" }),
});

const textPairLargeSchema = z.object({
	id: z.number(),
	text: z
		.string()
		.nonempty("英文を入力してください")
		.max(100, { message: "英文は100文字以内で入力してください" }),
	translation: z
		.string()
		.nonempty("翻訳を入力してください")
		.max(200, { message: "翻訳は200文字以内で入力してください" }),
});

export const formSchema = z.object({
	word: z.string().nonempty("英単語は必須項目です").max(50, {
		message: "英単語(英文)は50文字以内で入力してください",
	}),
	translation: z.string().nonempty("翻訳は必須項目です").max(100, {
		message: "翻訳は100文字以内で入力してください",
	}),
	meaning: z
		.string()
		.max(300, { message: "意味は300文字以内で入力してください" })
		.optional(),
	pronunciation: z
		.string()
		.max(200, { message: "発音のコツは200文字以内で入力してください" })
		.optional(),
	examples: z.array(textPairLargeSchema).max(5).optional(),
	collocations: z.array(textPairLargeSchema).max(5).optional(),
	trend: z
		.string()
		.max(500, { message: "TOIECの出題傾向は500文字以内で入力してください" })
		.optional(),
	derivations: z.array(textPairSchema).max(5).optional(),
	phrasal_verbs: z.array(textPairSchema).max(5).optional(),
	synonyms: z.array(textPairSchema).max(5).optional(),
	antonyms: z.array(textPairSchema).max(5).optional(),
	types: z.array(z.number()).optional(),
	etymology: z
		.string()
		.max(500, { message: "語源は500文字以内で入力してください" })
		.optional(),
	other: z
		.string()
		.max(500, { message: "その他の情報は500文字以内で入力してください" })
		.optional(),
});

export type FormData = z.infer<typeof formSchema>;
