import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react"; // useMemoを追加
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import type { QuizData } from "../types";
import {
	generateEnhancedQuizData,
	scrollToNext,
	scrollToResult,
} from "../utils";
import QuizCard from "./QuizCard";
import Result from "./Result";

const quizSchema = z.object({
	answers: z
		.array(z.string())
		.refine((answers) => answers.some((answer) => answer.trim() !== ""), {
			message: "少なくとも1つのクイズに回答してください",
		}),
});

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

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				{enhancedQuizData.map((quiz, index) => (
					<QuizCard
						key={quiz.word}
						quiz={quiz}
						options={quiz.options} // ここでシャッフル済みの options を渡す
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
							onClick={scrollToResult}
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
						isCorrect:
							quiz.translation.trim().toLowerCase() ===
							answers[index].trim().toLowerCase(),
					}))}
				/>
			)}
		</Form>
	);
};

export default QuizForm;
