export const getSpeakerDescription = ({ speakerId }: { speakerId: string }) => {
	const speakerDescriptions: { [key: string]: string } = {
		"en-US-Standard-A": "スマートな男性",
		"en-US-Standard-B": "渋いおじさん",
		"en-US-Standard-C": "かっこいい女性",
		"en-US-Standard-D": "イケてる男性",
		"en-US-Standard-E": "落ち着いた女性",
		"en-US-Standard-F": "自然な女性",
		"en-US-Standard-G": "働く女性",
		"en-US-Standard-H": "お天気キャスター風の女性",
		"en-US-Standard-I": "大学生風の男性",
		"en-US-Standard-J": "ビジネスマン風の男性",
	};

	return speakerDescriptions[speakerId] || "不明な話者";
};
