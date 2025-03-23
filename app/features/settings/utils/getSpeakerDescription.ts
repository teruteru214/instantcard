import { type SpeakerId, speakerDescriptions } from "../data/speaker";

interface GetSpeakerDescriptionProps {
	speakerId: SpeakerId;
}

export const getSpeakerDescription = ({
	speakerId,
}: GetSpeakerDescriptionProps): string => {
	return speakerDescriptions[speakerId] || "不明な話者";
};
