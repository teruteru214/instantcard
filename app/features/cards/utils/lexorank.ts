import { LexoRank } from "@dalet-oss/lexorank";
import type { WordData } from "../types";

/**
 * リストの最小（先頭）ランクを生成
 */
export const getFirstPosition = () => {
	return LexoRank.min().toString();
};

/**
 * リストの最大（末尾）ランクを生成
 */
export const getLastPosition = () => {
	return LexoRank.max().toString();
};

export const getMiddlePosition = (
	prevPosition: string,
	nextPosition: string,
) => {
	try {
		const prevRank = LexoRank.parse(prevPosition);
		const nextRank = LexoRank.parse(nextPosition);

		return prevRank.between(nextRank).toString();
	} catch {
		throw new Error("無効なposition文字列が指定されました");
	}
};

export const generateInitialPositions = (words: string[]): WordData[] => {
	let currentRank = LexoRank.min();
	return words.map((word, index) => {
		const wordData = {
			word,
			position: currentRank.toString(),
			word_tag_id: index + 1, // IDは1から順番
		};
		currentRank = currentRank.genNext();
		return wordData;
	});
};
