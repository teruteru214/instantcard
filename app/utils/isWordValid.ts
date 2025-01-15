export const isWordValid = (word: string): boolean => {
	return word.trim() !== "" && word.length <= 10 && !word.includes(" ");
};
