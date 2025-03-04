import { Button } from "~/components/ui/button";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Speech from "~/components/global/Speech";
import { speakers } from "../data/speaker";
import { getSpeakerDescription } from "../utils/getSpeakerDescription";

const speakerSchema = z.object({
	speaker: z.enum(Object.keys(speakers) as [string, ...string[]], {
		message: "話し手を選択してください",
	}),
});

const SpeakerSetting = ({ initialSpeaker }: { initialSpeaker: string }) => {
	// `initialSpeaker` を useState で管理
	const [selectedSpeaker, setSelectedSpeaker] = useState(initialSpeaker);
	const [isEditing, setIsEditing] = useState(false);

	const {
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm({
		resolver: zodResolver(speakerSchema),
		defaultValues: { speaker: initialSpeaker },
	});

	const formSpeaker = watch("speaker");

	const onSubmit = (data: { speaker: string }) => {
		console.log("選択された話し手:", data);
		setSelectedSpeaker(data.speaker);
		setIsEditing(false);
	};

	return (
		<div className="rounded-lg border border-gray-200 p-6">
			<div className="space-y-4">
				<h2 className="text-base font-medium">話し手</h2>
				{isEditing ? (
					<form onSubmit={handleSubmit(onSubmit)} className="mt-5">
						<RadioGroup
							defaultValue={formSpeaker}
							onValueChange={(value) => setValue("speaker", value)}
						>
							{Object.entries(speakers).map(([key, label]) => (
								<div key={key} className="flex items-center gap-1">
									<RadioGroupItem value={key} id={key} />
									<label htmlFor={key} className="text-gray-700 cursor-pointer">
										{label}
									</label>
									<Speech
										word="This is a sample voice."
										speakerId={key}
										size={7}
									/>
								</div>
							))}
						</RadioGroup>
						{errors.speaker && (
							<p className="text-red-500 text-sm">{errors.speaker.message}</p>
						)}
						<div className="mt-6 flex justify-end gap-5">
							<Button
								variant="ghost"
								type="button"
								onClick={() => {
									setIsEditing(false);
									setValue("speaker", selectedSpeaker);
								}}
								className="text-gray-400 hover:text-gray-500"
							>
								キャンセル
							</Button>
							<Button variant="default" type="submit">
								保存する
							</Button>
						</div>
					</form>
				) : (
					<>
						<p className="text-gray-500">
							{getSpeakerDescription({ speakerId: selectedSpeaker })}
						</p>
						<Button variant="outline" onClick={() => setIsEditing(true)}>
							変更する
						</Button>
					</>
				)}
			</div>
		</div>
	);
};

export default SpeakerSetting;
