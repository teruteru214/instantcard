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

/**
 * 2つのpositionの間の新しいpositionを計算
 * @param prevPosition 前のposition
 * @param nextPosition 次のposition
 */
export const getMiddlePosition = (
	prevPosition: string,
	nextPosition: string,
) => {
	const prevRank = LexoRank.parse(prevPosition);
	const nextRank = LexoRank.parse(nextPosition);

	return prevRank.between(nextRank).toString();
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
