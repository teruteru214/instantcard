export const frequencyLabel = (
	frequency: number,
): {
	label: string;
	variant: "destructive" | "info" | "good" | "outline";
} => {
	if (frequency >= 8) {
		return { label: "🥇TOEICによく出る", variant: "destructive" };
	}
	if (frequency >= 5) {
		return { label: "🥈TOEICで時々出る", variant: "info" };
	}
	if (frequency >= 3) {
		return { label: "🥉TOEICではあまり見かけない", variant: "good" };
	}
	return { label: "❌TOEICではほぼ出ない", variant: "outline" };
};
