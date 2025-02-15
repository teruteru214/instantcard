import Speech from "~/components/global/Speech";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "~/components/ui/form";
import { frequencyLabel } from "~/utils/frequencyLabel";
import AntonymsModal from "./AntonymsModal";
import ExampleModal from "./ExampleModal";
import ImageModal from "./ImageModal";

interface QuizProps {
	quiz: {
		word: string;
		translation: string;
		frequency: number;
	};
	options: string[];
	index: number;
	totalCount: number;
	scrollToNext: () => void;
}

const QuizCard = ({
	quiz,
	options,
	index,
	totalCount,
	scrollToNext,
}: QuizProps) => {
	const { label, variant } = frequencyLabel(quiz.frequency);

	return (
		<Card id={`quiz-card-${index}`} className="p-4">
			<div className="flex flex-col">
				<div className="flex justify-between items-center">
					<Badge variant={variant} size="sm">
						{label}
					</Badge>
					<p>
						{index + 1}/{totalCount}
					</p>
				</div>
				<h1 className="my-16 text-center text-2xl font-bold">{quiz.word}</h1>
				<FormField
					name={`answers.${index}`}
					render={({ field }) => (
						<FormItem>
							<div className="flex justify-between items-center">
								<p>正しい答えを選んでください</p>
								<Speech word={quiz.word} size={20} />
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
								{options.map((option) => (
									<FormControl key={option}>
										<Button
											type="button"
											variant={field.value === option ? "black" : "white"}
											size="option"
											onClick={() => field.onChange(option)}
											aria-label={`選択肢: ${option}`}
											aria-pressed={field.value === option}
											className="break-words whitespace-normal"
										>
											{option}
										</Button>
									</FormControl>
								))}
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="mt-2 flex justify-between items-center">
					<div>
						<ExampleModal word={quiz.word} />
						<AntonymsModal word={quiz.word} />
						<ImageModal word={quiz.word} />
					</div>
					<span
						className=" text-gray-400 hover:text-gray-500 hover:underline cursor-pointer"
						onClick={scrollToNext}
						onKeyUp={(e) => {
							if (e.key === "Enter" || e.key === "Space") {
								e.preventDefault();
								scrollToNext();
							}
						}}
					>
						スキップする？
					</span>
				</div>
			</div>
		</Card>
	);
};

export default QuizCard;
