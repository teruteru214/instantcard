import { z } from "zod";

export const quizSchema = z.object({
	answers: z
		.array(z.string())
		.refine((answers) => answers.some((answer) => answer.trim() !== ""), {
			message: "少なくとも1つのクイズに回答してください",
		}),
});
