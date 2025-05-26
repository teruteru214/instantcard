import { z } from "zod";

export const UserSchema = z.object({
	id: z.number(),
	name: z.string().max(20),
	img: z.string().max(250).nullable(),
	speaker: z.string().max(20).nullable(),
});

export type User = z.infer<typeof UserSchema>;
