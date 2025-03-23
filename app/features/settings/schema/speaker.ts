import { z } from "zod";
import { SPEAKER_IDS } from "../data/speaker";

export const speakerSchema = z.object({
	speaker: z.enum(SPEAKER_IDS, {
		message: "話し手を選択してください",
	}),
});

export type SpeakerFormValues = z.infer<typeof speakerSchema>;
