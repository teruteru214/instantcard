import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import NoCard from "~/components/global/NoCard";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";

import TagHeader from "~/components/layout/TagHeader";
import QuizCard from "./components/QuizCard";
import Result from "./components/Result";
import {
	generateEnhancedQuizData,
	scrollToNext,
	scrollToResult,
} from "./utils";

const quizData = [
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

const quizSchema = z.object({
	answers: z
		.array(z.string())
		.refine((answers) => answers.some((answer) => answer.trim() !== ""), {
			message: "少なくとも1つのクイズに回答してください",
		}),
});

const enhancedQuizData = generateEnhancedQuizData(quizData);

const QuizPage = () => {
	const form = useForm({
		resolver: zodResolver(quizSchema),
		defaultValues: {
			answers: Array(enhancedQuizData.length).fill(""),
		},
	});

	const onSubmit = async () => {
		console.log(form.getValues());
	};

	const answers = form.watch("answers");

	return (
		<>
			<TagHeader totalCount={enhancedQuizData.length} />
			{enhancedQuizData.length === 0 ? (
				<NoCard type="quiz" />
			) : (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						{enhancedQuizData.map((quiz, index) => (
							<QuizCard
								key={quiz.word}
								quiz={quiz}
								options={quiz.options}
								index={index}
								totalCount={enhancedQuizData.length}
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
