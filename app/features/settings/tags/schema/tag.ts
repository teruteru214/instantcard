import { z } from "zod";

export const tagSchema = z.object({
	name: z
		.string()
		.min(1, "1文字以上入力してください")
		.max(15, "15文字以内で入力してください"),
});
