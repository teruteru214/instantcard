export const SPEAKER_IDS = [
	"en-US-Standard-A",
	"en-US-Standard-B",
	"en-US-Standard-C",
	"en-US-Standard-D",
	"en-US-Standard-E",
	"en-US-Standard-F",
	"en-US-Standard-G",
	"en-US-Standard-H",
	"en-US-Standard-I",
	"en-US-Standard-J",
] as const;

export type SpeakerId = (typeof SPEAKER_IDS)[number];

export const speakerDescriptions: Record<SpeakerId, string> = {
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

export const speakers = speakerDescriptions;
