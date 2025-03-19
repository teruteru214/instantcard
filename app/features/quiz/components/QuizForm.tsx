import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { quizSchema } from "../schema/quizSchema";
import type { QuizData } from "../types";
import {
	generateEnhancedQuizData,
	scrollToNext,
	scrollToResult,
} from "../utils";
import QuizCard from "./QuizCard";
import Result from "./Result";

interface QuizFormProps {
	quizData: QuizData[];
}

const QuizForm = ({ quizData }: QuizFormProps) => {
	const enhancedQuizData = useMemo(
		() => generateEnhancedQuizData(quizData),
		[quizData],
	);

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

	const isAnswerCorrect = (correctAnswer: string, userAnswer: string) => {
		return (
			correctAnswer.trim().toLowerCase() === userAnswer.trim().toLowerCase()
		);
	};

	return (
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
					<div className="pt-8 pb-16 space-y-4 flex flex-col items-center justify-center">
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
							onClick={scrollToResult}
							id="quiz-result-button"
							aria-label="クイズを終了して結果を表示する"
						>
							クイズを終了する
						</Button>
					</div>
				)}
			</form>
			{form.formState.isSubmitted && enhancedQuizData.length > 0 && (
				<Result
					result={enhancedQuizData.map((quiz, index) => ({
						word: quiz.word,
						correctAnswer: quiz.translation,
						userAnswer: answers[index],
						isCorrect: isAnswerCorrect(quiz.translation, answers[index]),
					}))}
				/>
			)}
		</Form>
	);
};

export default QuizForm;
