import NoCard from "~/components/global/NoCard";
import TagHeader from "~/components/layout/TagHeader";
import QuizForm from "./components/QuizForm";
import type { QuizData } from "./types";

const quizData: QuizData[] = [
	{
		word: "What shall we do?",
		translation: "私たちは何をしましょうか？",
		frequency: 7,
	},
	{
		word: "Where are you from?",
		translation: "あなたはどこから来ましたか？",
		frequency: 8,
	},
	{
		word: "How old are you?",
		translation: "あなたは何歳ですか？",
		frequency: 6,
	},
	{
		word: "What is your name?",
		translation: "あなたの名前は何ですか？",
		frequency: 9,
	},
];

const QuizPage = () => {
	return (
		<>
			<TagHeader totalCount={quizData.length} />
			{quizData.length === 0 ? (
				<NoCard type="quiz" />
			) : (
				<QuizForm quizData={quizData} />
			)}
		</>
	);
};

export default QuizPage;
