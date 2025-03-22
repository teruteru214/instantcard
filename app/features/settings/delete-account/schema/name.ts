import { z } from "zod";

export const user = {
	name: "tarou",
};

export const nameSchema = z.object({
	confirmation: z.literal(user.name, {
		errorMap: () => ({ message: `"${user.name}" と入力してください` }),
	}),
});

export type FormValues = z.infer<typeof nameSchema>;
