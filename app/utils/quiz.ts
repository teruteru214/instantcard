const shuffleArray = (array: string[]) => {
	return array.sort(() => Math.random() - 0.5);
};

export const generateEnhancedQuizData = (
	quizData: { id: number; word: string; translation: string }[],
) => {
	return quizData.map((quiz) => {
		const otherTranslations = quizData
			.filter((q) => q.id !== quiz.id)
			.map((q) => q.translation);
		const options = shuffleArray([
			quiz.translation,
			...otherTranslations.slice(0, 3),
		]);
		return { ...quiz, options };
	});
};

export const scrollToNext = (index: number) => {
	const nextCard = document.getElementById(`quiz-card-${index + 1}`);
	if (nextCard) {
		const offsetTop = nextCard.getBoundingClientRect().top + window.pageYOffset;

		window.scrollTo({
			top: offsetTop - 64,
			behavior: "smooth",
		});
	} else {
		const footer = document.getElementById("quiz-footer");
		if (footer) {
			const footerOffsetTop =
				footer.getBoundingClientRect().top + window.pageYOffset;
			window.scrollTo({
				top: footerOffsetTop - 64,
				behavior: "smooth",
			});
		}
	}
};

export const scrollToResult = () => {
	const resultElement = document.getElementById("result");
	if (resultElement) {
		const offset = 64;
		const elementPosition =
			resultElement.getBoundingClientRect().top + window.scrollY;
		const offsetPosition = elementPosition - offset;

		window.scrollTo({
			top: offsetPosition,
			behavior: "smooth",
		});
	}
};
