export const frequencyLabel = (
	frequency: number,
): {
	label: string;
	variant: "destructive" | "info" | "good" | "outline";
} => {
	if (frequency >= 8) {
		return { label: "🥇英語圏で頻繁に使用", variant: "destructive" };
	}
	if (frequency >= 5) {
		return { label: "🥈英語圏で日常的に使用", variant: "info" };
	}
	if (frequency >= 3) {
		return { label: "🥉英語圏で時々使用", variant: "good" };
	}
	return { label: "❌英語圏でほとんど使用しない", variant: "outline" };
};
