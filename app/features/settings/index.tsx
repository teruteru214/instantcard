import DeleteAccount from "./components/DeleteAccount";
import NotePrompt from "./components/NotePrompt";
import ProfileImageSection from "./components/ProfileImageSetting";
import ProfileNameSetting from "./components/ProfileNameSetting";
import SpeakerSetting from "./components/SpeakerSetting";
import TagSection from "./components/TagSection";
import TrashSection from "./components/TrashSection";
import type { SpeakerId } from "./data/speaker";

const SettingsPage = () => {
	const userData = {
		img: "https://plus.unsplash.com/premium_photo-1681412205238-8171ccaca82b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		name: "てる太郎",
		speaker: "en-US-Standard-C" as SpeakerId,
		cardCount: 6,
		note_prompt:
			"以下の英単語を使用して、日常生活で使える例文を3つ作成してください。各例文には、単語の意味と使い方の説明を含めてください。対象読者は英語学習初心者です。",
	};

	return (
		<div className="bg-white min-h-screen flex flex-col">
			<main className="flex-1 flex flex-col gap-6 py-4">
				<ProfileImageSection img={userData.img} />

				<ProfileNameSetting name={userData.name} />

				<SpeakerSetting initialSpeaker={userData.speaker} />

				<TrashSection cardCount={userData.cardCount} />

				<TagSection />

				<NotePrompt note_prompt={userData.note_prompt} />

				<DeleteAccount />
			</main>
		</div>
	);
};

export default SettingsPage;
