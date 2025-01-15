export const isWordValid = (word: string): boolean => {
	const actualWord = word.trim(); // 本来の文字列を表す変数
	return (
		actualWord !== "" && actualWord.length <= 10 && !actualWord.includes(" ")
	);
};
