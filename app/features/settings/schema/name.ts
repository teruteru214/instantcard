import { z } from "zod";

export const nameSchema = z.object({
	name: z
		.string()
		.min(1, "表示名を入力してください")
		.max(20, "20文字以内で入力してください"),
});
