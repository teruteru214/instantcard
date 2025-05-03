import { z } from "zod";

export const NotePromptSchema = z.object({
	note_prompt: z.string().max(500, "500文字以内で入力してください"),
});
