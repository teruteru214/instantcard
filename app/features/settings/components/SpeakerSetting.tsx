import { Button } from "~/components/ui/button";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Speech from "~/components/global/Speech";
import { SPEAKER_IDS, type SpeakerId, speakers } from "../data/speaker";
import { type SpeakerFormValues, speakerSchema } from "../schema/speaker";
import { getSpeakerDescription } from "../utils/getSpeakerDescription";

interface SpeakerSettingProps {
	initialSpeaker: SpeakerId;
}

const SpeakerSetting = ({ initialSpeaker }: SpeakerSettingProps) => {
	const [selectedSpeaker, setSelectedSpeaker] =
		useState<SpeakerId>(initialSpeaker);
	const [isEditing, setIsEditing] = useState(false);

	const {
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm<SpeakerFormValues>({
		resolver: zodResolver(speakerSchema),
		defaultValues: { speaker: initialSpeaker },
	});

	const formSpeaker = watch("speaker");

	const onSubmit = (data: SpeakerFormValues) => {
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
							onValueChange={(value: SpeakerId) => setValue("speaker", value)}
							aria-label="話し手の選択"
						>
							{Object.entries(speakers).map(
								([key, label]) =>
									// keyがSpeakerIdに含まれているものだけをマッピング
									SPEAKER_IDS.includes(key as SpeakerId) && (
										<div key={key} className="flex items-center gap-1">
											<RadioGroupItem value={key} id={key} />
											<label
												htmlFor={key}
												className="text-gray-700 cursor-pointer"
											>
												{label}
											</label>
											<Speech
												word="This is a sample voice."
												speakerId={key}
												size={7}
											/>
										</div>
									),
							)}
						</RadioGroup>
						{errors.speaker && (
							<p className="text-red-500 text-sm">{errors.speaker.message}</p>
						)}
						<div className="mt-6 flex justify-end gap-2">
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
						<p className="text-gray-500" aria-live="polite">
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
