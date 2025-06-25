import { z } from "zod";
import { LANGUAGE_IDS } from "~/config/languageOption";

export const registerSchema = z.object({
	name: z
		.string()
		.min(1, "ユーザー名を入力してください")
		.max(20, "20文字以内で入力してください"),
	language: z.enum(LANGUAGE_IDS, {
		message: "学習言語を選択してください",
	}),
	purpose: z.string().max(50, "50文字以内で入力してください").optional(),
});
