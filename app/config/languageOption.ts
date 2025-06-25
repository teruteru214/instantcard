export const LANGUAGE_IDS = [
	"zh-CN", // 簡体字中国語
	"zh-TW", // 繁体字中国語
	"es", // スペイン語
	"ja", // 日本語
	"ko", // 韓国語
	"fr", // フランス語
	"de", // ドイツ語
	"pt", // ポルトガル語
	"ar", // アラビア語
	"nl", // オランダ語
	"no", // ノルウェー語
	"sv", // スウェーデン語
	"da", // デンマーク語
] as const;

export type LanguageId = (typeof LANGUAGE_IDS)[number];

export const languageDescriptions: Record<LanguageId, string> = {
	"zh-CN": "🇨🇳 简体中文",
	"zh-TW": "🇹🇼 繁體中文",
	es: "🇪🇸 Español",
	ja: "🇯🇵 日本語",
	ko: "🇰🇷 한국어",
	fr: "🇫🇷 Français",
	de: "🇩🇪 Deutsch",
	pt: "🇵🇹 Português",
	ar: "🇸🇦 العربية",
	nl: "🇳🇱 Nederlands",
	no: "🇳🇴 Norsk",
	sv: "🇸 Svenska",
	da: "🇩🇰 Dansk",
};

export const languages = languageDescriptions;
