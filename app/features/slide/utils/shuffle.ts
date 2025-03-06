import type { SlideWord } from "../types";

export const shuffleSlides = (data: SlideWord[]) => {
	const grouped = data.reduce<Record<string, SlideWord[]>>((acc, item) => {
		const pairId = item.id.split("-")[0];
		if (!acc[pairId]) acc[pairId] = [];
		acc[pairId].push(item);
		return acc;
	}, {});
	return Object.values(grouped)
		.sort(() => Math.random() - 0.5)
		.flat();
};
