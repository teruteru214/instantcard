import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@remix-run/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import NoCard from "~/components/global/NoCard";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import {
	generateEnhancedQuizData,
	scrollToNext,
	scrollToResult,
} from "~/utils/quiz";
import QuizCard from "./QuizCard";
import QuizHeader from "./QuizHeader";
import Result from "./Result";

const quizData = [
	{
		id: 1,
		word: "What shall we do?",
		translation: "私たちは何をしましょうか？",
	},
	{
		id: 2,
		word: "Where are you from?",
		translation: "あなたはどこから来ましたか？",
	},
	{
		id: 3,
		word: "How old are you?",
		translation: "あなたは何歳ですか？",
	},
	{
		id: 4,
		word: "What is your name?",
		translation: "あなたの名前は何ですか？",
	},
];

const quizSchema = z.object({
	answers: z
		.array(z.string())
		.refine((answers) => answers.some((answer) => answer.trim() !== ""), {
			message: "少なくとも1つのクイズに回答してください",
		}),
});

const enhancedQuizData = generateEnhancedQuizData(quizData);

const QuizPage = () => {
	const navigate = useNavigate();

	const form = useForm({
		resolver: zodResolver(quizSchema),
		defaultValues: {
			answers: Array(enhancedQuizData.length).fill(""),
		},
	});

	const onSubmit = async () => {
		navigate("#result", { replace: true });
	};

	const answers = form.watch("answers");
	const currentAnswerCount = form
		.watch("answers")
		.filter((answer) => answer && answer.trim() !== "").length;

	return (
		<>
			{enhancedQuizData.length === 0 ? (
				<NoCard type="quiz" />
			) : (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<QuizHeader
							isSaveEnabled={form.formState.isDirty && form.formState.isValid}
							currentAnswerCount={currentAnswerCount}
							totalQuizCount={enhancedQuizData.length}
							isFinished={form.formState.isSubmitted}
						/>
						{enhancedQuizData.map((quiz, index) => (
							<QuizCard
								key={quiz.id}
								quiz={quiz}
								options={quiz.options}
								index={index}
								scrollToNext={() => scrollToNext(index)}
							/>
						))}

						{!form.formState.isSubmitted && (
							<div className="py-16 space-y-4 flex flex-col items-center justify-center">
								<img
									src="/check.webp"
									alt="confirmation"
									width={200}
									height={200}
								/>
								<p>お疲れ様でした！クイズを終了しますか？</p>
								<Button
									variant="black"
									size="giant"
									disabled={!form.formState.isValid}
									onClick={() => {
										scrollToResult();
									}}
								>
									クイズを終了する
								</Button>
							</div>
						)}
					</form>
				</Form>
			)}
			{form.formState.isSubmitted && enhancedQuizData.length > 0 && (
				<Result
					result={enhancedQuizData.map((quiz, index) => ({
						word: quiz.word,
						correctAnswer: quiz.translation,
						userAnswer: answers[index],
						isCorrect:
							quiz.translation.trim().toLowerCase() ===
							answers[index].trim().toLowerCase(),
					}))}
				/>
			)}
		</>
	);
};

export default QuizPage;
