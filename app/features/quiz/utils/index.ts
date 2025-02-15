const shuffleArray = (array: string[]) => {
	const newArray = [...array];
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
};

export const generateEnhancedQuizData = (
	quizData: { word: string; translation: string; frequency: number }[],
) => {
	return quizData.map((quiz) => {
		const otherTranslations = quizData
			.filter((q) => q.word !== quiz.word)
			.map((q) => q.translation);

		const options = shuffleArray([
			quiz.translation,
			...otherTranslations.slice(0, 3),
		]);

		return { ...quiz, options, frequency: quiz.frequency };
	});
};

const HEADER_OFFSET = 64;

const isClient = typeof window !== "undefined";

const smoothScrollSupported = isClient
	? "scrollBehavior" in document.documentElement.style
	: false;

const scrollToElement = (elementId: string) => {
	if (!isClient) return;

	try {
		const element = document.getElementById(elementId);
		if (element) {
			const elementPosition =
				element.getBoundingClientRect().top + window.scrollY;
			const offsetPosition = elementPosition - HEADER_OFFSET;

			window.scrollTo({
				top: offsetPosition,
				behavior: smoothScrollSupported ? "smooth" : "auto",
			});
		}
	} catch (error) {
		console.error("スクロール処理中にエラーが発生しました:", error);
	}
};

export const scrollToNext = (index: number) => {
	if (!isClient) return;

	const nextCardId = `quiz-card-${index + 1}`;
	const footerId = "quiz-footer";

	try {
		const nextCard = document.getElementById(nextCardId);
		if (nextCard) {
			scrollToElement(nextCardId);
			return;
		}

		const footer = document.getElementById(footerId);
		if (footer) {
			scrollToElement(footerId);
		}
	} catch (error) {
		console.error(
			"次のカードへのスクロール処理中にエラーが発生しました:",
			error,
		);
	}
};

export const scrollToResult = () => {
	if (isClient) scrollToElement("result");
};

export const getBadgeVariant = (
	correctCount: number,
	totalCount: number,
): {
	variant: "excellent" | "good" | "info" | "destructive";
	emoji: string;
} => {
	const percentage = Math.round((correctCount / totalCount) * 100);

	if (percentage >= 90) return { variant: "excellent", emoji: "🏆" };
	if (percentage >= 70) return { variant: "good", emoji: "😃" };
	if (percentage >= 50) return { variant: "info", emoji: "😐" };
	return { variant: "destructive", emoji: "😢" }; //
};
